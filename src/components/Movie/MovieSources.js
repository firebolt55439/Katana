import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2/src/sweetalert2.js";

import PlayIcon from "../../static/images/play-button.svg";

import { AuthContext } from "../../auth-context";
import { logEvent, logCustomEvent, auth } from "../../auth-enabled";

const BACKEND_URL = window.location.origin;
const CancelToken = axios.CancelToken;

export default class MovieSources extends Component {
  state = {
    loading: true,
    sources: [],
    cancelSource: CancelToken.source(),
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.numSources = 0;
    this.numSourcesRetrieved = -1;
    this.params = null;
  }

  markSourceRetrieved() {
    if (this.numSourcesRetrieved < 0) {
      this.numSourcesRetrieved = 1;
    } else {
      this.numSourcesRetrieved += 1;
    }
    if (this.numSourcesRetrieved >= this.numSources) {
      this.setState({
        loading: false,
      });
      logEvent("Sources", "Retrieved", {
        title: this.props.movie.title || this.props.movie.name,
        number_of_sources: this.numSourcesRetrieved,
        number_of_hosts: this.state.sources.length,
      });
    }
    console.log(
      "Marked source retrieved (%d out of %d)",
      this.numSourcesRetrieved,
      this.numSources
    );
  }

  promptForEpisodeDetails() {
    var params = this.params;
    var thisRef = this;
    const Queue = Swal.mixin({
      input: "number",
      confirmButtonText: "Next &rarr;",
      showCancelButton: true,
      progressSteps: ["1", "2"],
      allowOutsideClick: false,
      allowEscapeKey: false,
      customClass: "swal-bigger",
    });

    Queue.fire({
      title: "Season #",
      text: "Enter the season number:",
      currentProgressStep: 0,
    })
      .then((result) => {
        if (result.value) {
          params.season = result.value[0];
          return Queue.fire({
            title: "Episode #",
            text: "Enter the episode number:",
            currentProgressStep: 1,
          });
        }
      })
      .then((result) => {
        if (result.value) {
          params.episode = result.value[0];
          thisRef.setState({ loading: true });
          thisRef.startFetchingSources();
          logEvent("TV", "Select", {
            title: this.props.movie.title || this.props.movie.name,
            season: params.season,
            episode: params.episode,
          });
        }
      });
  }

  startFetchingSources() {
    const userToken = this.context;
    var params = this.params;
    if (params === null) {
      params = this.params = {
        imdb_id:
          this.props.movie.imdb_id ||
          (this.props.movie.external_ids
            ? this.props.movie.external_ids.imdb_id
            : "<none>"),
        title: this.props.movie.title || this.props.movie.name,
        category: this.props.movie.number_of_seasons ? "tv" : "movie",
        season: null,
        episode: null,
        token: userToken,
        uid: btoa(auth.currentUser ? btoa(auth.currentUser.email) : ""),
      };
    }
    if (params.category === "tv" && (!params.season || !params.episode)) {
      this.setState({ loading: false });
      this.promptForEpisodeDetails();
      return;
    }
    console.log(params);
    var thisRef = this;
    axios({
      method: "get",
      url: `${BACKEND_URL}/sources/available`,
      params: params,
      cancelToken: this.state.cancelSource.token,
    })
      .then((res) => {
        const data = res.data;
        thisRef.numSources = data.length;
        for (let source_id of data) {
          var params_copy = Object.assign({}, params);
          params_copy["source"] = source_id;
          // if (source_id != 1) continue;
          axios({
            method: "get",
            url: `${BACKEND_URL}/sources/individual`,
            params: params_copy,
            cancelToken: this.state.cancelSource.token,
          })
            .then((res) => {
              const data = res.data;
              console.log("Received data from source", data);
              thisRef.setState({
                sources: thisRef.state.sources.concat(data),
              });
            })
            .catch((err) => {
              if (axios.isCancel(err)) {
                console.log("Source request cancelled by user:", err.message);
                return;
              }
              console.warn("Could not retrieve individual source!");
              console.error(err);
            })
            .finally(() => {
              thisRef.markSourceRetrieved();
            });
        }
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("Request cancelled by user:", err.message);
          return;
        }
        console.warn("Could not retrieve available sources!");
        console.error(err);
      });
  }

  componentDidMount() {
    console.log(this.props.movie);
    this.startFetchingSources();
  }

  handleWatchClick = (e) => {
    e.target.blur();
    var td = e.target.parentNode;
    console.log(td);
    var link = td.dataset.url;
    var is_embed = td.dataset.embed;
    console.log("is embed:", is_embed);
    console.log("embed link:", link);
    window.open(
      link,
      "_blank",
      "toolbar=no,titlebar=no,menubar=no,status=no,fullscreen=yes,scrollbars=no,resizable=no,top=0,left=0,width=" +
        screen.width.toString() +
        ",height=" +
        screen.height.toString()
    );
    e.preventDefault();
    logEvent("Sources", "Click", {
      title: this.props.movie.title || this.props.movie.name,
      season: this.params.season,
      episode: this.params.episode,
      host: td.dataset.source,
    });
  };

  componentWillUnmount() {
    console.log("Movie source gone!");
    this.state.cancelSource.cancel("instance destroyed");
  }

  render() {
    var rows = [];
    /*
    "title" => item title (e.g. a filename)
    #   "source" => source name (e.g. Hulu)
    #   "quality" => quality description (e.g. SD, 720p, 4K)
    #   "embed" => embedded video player link, if applicable
    #   "ddl" => direct download link, if applicable
     */
    for (var i = 0; i < this.state.sources.length; i++) {
      var on = this.state.sources[i];
      rows.push(
        <tr key={i} className="modal__sources--list__source">
          <td className="modal__sources--list__source--name content-td">
            {on.source}
          </td>
          <td className="modal__sources--list__source--title content-td">
            {on.title || "<none>"}
          </td>
          <td className="content-td">{on.quality}</td>
          <td
            className="content-td"
            data-url={on.embed || on.ddl}
            data-embed={!!on.embed}
            data-source={on.source}
          >
            <button
              className="modal__btn modal__sources--play_btn"
              onClick={this.handleWatchClick}
            >
              <PlayIcon className="modal__btn--icon" />
              Watch
            </button>
          </td>
        </tr>
      );
    }
    return (
      // <Table, live-updating with props as more sources fetched in async fashion from URL's>
      <div className="modal__sources">
        <h3>
          Sources
          {this.state.sources.length > 0
            ? " (" + this.state.sources.length.toString() + ")"
            : ""}
          {this.props.movie.number_of_seasons && this.params
            ? ` for S${this.params.season}E${this.params.episode}`
            : ""}
        </h3>
        {this.state.loading ? (
          <div className="modal__sources--loading">
            <div className="source-loader">
              <div className="duo duo1">
                <div className="dot dot-a"></div>
                <div className="dot dot-b"></div>
              </div>
              <div className="duo duo2">
                <div className="dot dot-a"></div>
                <div className="dot dot-b"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="modal__sources--pull"></div>
        )}
        {this.state.sources.length > 0 ? (
          <div className="modal__sources--list">
            <div className="tbl-header">
              <table
                className="tbl-table"
                cellPadding="0"
                cellSpacing="0"
                border="0"
              >
                <thead>
                  <tr>
                    <th className="header-th" scope="col">
                      Source
                    </th>
                    <th className="header-th" scope="col">
                      Title
                    </th>
                    <th className="header-th" scope="col">
                      Quality
                    </th>
                    <th className="header-th" scope="col">
                      Watch
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="tbl-content">
              <table
                className="tbl-table"
                cellPadding="0"
                cellSpacing="0"
                border="0"
              >
                <tbody>{rows}</tbody>
              </table>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
}
