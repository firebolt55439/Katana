import React, { Component } from 'react';

import Modal from '../components/UI/Modal';
import MovieDetails from '../components/Movie/MovieDetails';

import { API_KEY } from '../store/actions/index';
import axios from 'axios';

export default class MovieGenre extends Component {
   state = {
      toggleModal: false,
      downloadedMovie: null
   }

   handleToggleModal = () => {
     const url = "first_air_date" in this.props.movie ? `https://api.themoviedb.org/3/tv/${this.props.movie.id}?api_key=${API_KEY}&language=en-US`
                                                      : `https://api.themoviedb.org/3/movie/${this.props.movie.id}?api_key=${API_KEY}&language=en-US`;
     axios
       .get(url)
       .then(res => {
         this.setState({ toggleModal: true, downloadedMovie: res.data });
       })
       .catch(error => {
         console.log(error);
       });
   }

   closeModal = () => {
      this.setState({ toggleModal: false })
   }

   render() {
      let netflixUrl = false;
      if (this.props.url.indexOf("with_networks=213") !== -1) {
         netflixUrl = true;
      }

      return (
         <>
            <div onClick={() => this.handleToggleModal()}
               className={"movieShowcase__container--movie" + (netflixUrl ? "__netflix" : "")}>
               <img src={this.props.posterUrl} className="movieShowcase__container--movie-image" />
               <div className={"movieShowcase__container--movie" + (netflixUrl ? "__netflix" : "") + "__reveal"}>
                  <div className={"movieShowcase__container--movie" + (netflixUrl ? "__netflix" : "") + "__reveal--text"}>
                     <h1 className={"movieShowcase__container--movie" + (netflixUrl ? "__netflix" : "") + "__reveal--text__title"}>{this.props.movie.title || this.props.movie.name}</h1>
                     <span className={"movieShowcase__container--movie" + (netflixUrl ? "__netflix" : "") + "__reveal--text__desc"}>{this.props.movie.overview}</span>
                  </div>
               </div>
            </div>
            {this.state.toggleModal &&
               <Modal show={this.state.toggleModal} movie={this.state.downloadedMovie || this.props.movie} modalClosed={this.closeModal}>
                  <MovieDetails movie={this.state.downloadedMovie || this.props.movie} isClicked={this.state.toggleModal} />
               </Modal>
            }
         </>
      )
   }
}
