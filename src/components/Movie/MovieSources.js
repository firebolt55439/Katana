import React, { Component } from 'react';
import axios from 'axios';

const BACKEND_URL = "http://127.0.0.1:5000";

export default class MovieSources extends Component {
  state = {
    loading: true,
    sources: []
  }

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    // TODO: Start parallel AJAX resolution
    // document.addEventListener("keydown", this.escFunction, false);
  }

  render() {
    // TODO: Add new sourcebox component here that is triggered on play button click, does async loading and rendering,
    // and allows embed and ddl clicking
    // window.open("https://www.w3schools.com", "_blank", "toolbar=no,titlebar=no,menubar=no,status=no,fullscreen=yes,scrollbars=no,resizable=no,top=0,left=0,width=500,height=500");
    // ^ use for embed
    var rows = [];
    /*
    "title" => item title (e.g. a filename)
    #   "source" => source name (e.g. Hulu)
    #   "quality" => quality description (e.g. SD, 720p, 4K)
    #   "embed" => embedded video player link, if applicable
    #   "ddl" => direct download link, if applicable
     */
    for (var i = 0; i < this.state.sources.length; i++) {
      var on = this.state.sourcse[i];
      rows.push(
        <tr className="modal__sources--list__source">
          <td className="modal__sources--list__source--name content-td">{on.source}</td>
          <td className="modal__sources--list__source--title content-td">{on.title}</td>
          <td className="content-td">{on.quality}</td>
          <td className="content-td" data-url={on.embed || on.ddl} data-embed={!!on.embed}><button>Watch</button></td>
        </tr>
      );
    }
    return (
      // <Table, live-updating with props as more sources fetched in async fashion from URL's>
      <div className="modal__sources">
        <h3>Sources:</h3>
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
        ) : (<></>)}
        {this.state.sources.length > 0 ? (
          <>
            <div className="tbl-header">
              <table className="tbl-table" cellpadding="0" cellspacing="0" border="0">
                <thead>
                  <tr>
                    <th className="header-th" scope="col">Source</th>
                    <th className="header-th" scope="col">Title</th>
                    <th className="header-th" scope="col">Quality</th>
                    <th className="header-th" scope="col">Watch</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="tbl-content">
              <table className="tbl-table" cellpadding="0" cellspacing="0" border="0">
                <tbody>{rows}</tbody>
              </table>
            </div>
          </>
        ) : (<></>)}
      </div>
    );
  }
}

