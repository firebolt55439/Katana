import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import AddIcon from '../../static/images/add.svg';
import PlayIcon from '../../static/images/play-button.svg';

import MovieSources from './MovieSources';

export default class MovieDetails extends Component {
  state = {
    playButtonClicked: false
  }
  constructor(props) {
    super(props);
  }

  playClicked = (e) => {
    // e.preventDefault();
    // e.stopPropagation();
    e.target.blur();
    this.setState({playButtonClicked: true});
  }

  render() {
    if (this.props.movie.spoken_languages || this.props.movie.runtime) {
      console.log(this.props.movie);
    }
    let date;
    const raw_date = this.props.movie.release_date || this.props.movie.last_air_date;
    if (raw_date !== undefined) {
      const dt = Date.parse(raw_date);
      const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' });
      const [{ value: mo },,{ value: da },,{ value: ye }] = dtf.formatToParts(dt) ;
      // date = `${mo} ${da}, ${ye}`;
      date = ye;
    }
    const runtime = this.props.movie.runtime || (Array.isArray(this.props.movie.episode_run_time) ? this.props.movie.episode_run_time[0] : this.props.movie.episode_run_time);
    const runtime_str = (runtime < 60 ? (runtime.toString() + "m") : (Math.floor(runtime / 60).toString() + "h " + (runtime % 60) + "m"));
    let info = [date, runtime_str];
    if (this.props.movie.number_of_seasons) {
      info.push(this.props.movie.number_of_seasons.toString() + " season" + (this.props.movie.number_of_seasons == 1 ? "" : "s"));
    }
    if (this.props.movie.number_of_episodes) {
      info.push(this.props.movie.number_of_episodes.toString() + " episode" + (this.props.movie.number_of_episodes == 1 ? "" : "s"));
    }
    if (this.props.movie.spoken_languages && this.props.movie.spoken_languages.length > 0) {
      var elem = this.props.movie.spoken_languages[0];
      for (const language of this.props.movie.spoken_languages) {
        if (language.name === "English") {
          elem = language;
        }
      }
      info.push(elem.name);
    }
    return (
      <Aux>
        <div className="modal__container">
          <h1 className="modal__title">
            {this.props.movie.title || this.props.movie.name}
          </h1>
          {this.props.movie.tagline ? (<p className="modal__tagline">{this.props.movie.tagline}</p>) : (<></>)}
          <p className="modal__info">
            {info.join("\u00A0\u00A0|\u00A0\u00A0")}
          </p>
          {this.state.playButtonClicked ? (
            <MovieSources movie={this.props.movie} />
          ) : (
            <>
              <p className="modal__overview">{this.props.movie.overview}</p>
              <button className="modal__btn modal__btn--red" onClick={this.playClicked}>
                <PlayIcon className="modal__btn--icon" />
                Play
              </button>
              <button className="modal__btn">
                <AddIcon className="modal__btn--icon" />
                My List
              </button>
            </>
          )}
        </div>
      </Aux>
    );
  }
}
