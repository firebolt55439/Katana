import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import { getMovieRows } from '../getMovie';

export default class MovieRow extends Component {
  animateCSS(node, animationName, callback) {
      // const node = document.querySelector(element)
      node.classList.add('animated', 'faste', animationName)

      function handleAnimationEnd() {
          node.classList.remove('animated', 'faste', animationName)
          node.removeEventListener('animationend', handleAnimationEnd)

          if (typeof callback === 'function') callback()
      }

      node.addEventListener('animationend', handleAnimationEnd)
  }

  handleScroll = (evt, d) => {
    /* Stop event propagation */
    evt.preventDefault();
    evt.stopPropagation();

    /* Find container */
    var e = evt.target.parentElement;
    while (!e.classList.contains("movieShowcase__flex")) {
      e = e.parentElement;
    }
    e = e.childNodes[2];

    /* Scroll by 3 posters' width or animate a shake if at end of scroll */
    const amount = 3 * e.childNodes[0].clientWidth;
    if ((d < 0 && e.scrollLeft <= 0) || (d > 0 && e.scrollLeft + e.clientWidth >= e.scrollWidth)) {
      this.animateCSS(e, "jello");
    } else {
      e.scrollBy({
        left: d * amount,
        behavior: 'smooth'
      });
    }
  }

  scrollLeft = (e) => {
    this.handleScroll(e, -1);
  }

  scrollRight = (e) => {
    this.handleScroll(e, 1);
  }

  render() {
    const {heading, movies} = this.props;

    return movies && movies.length ? (
      <>
        <h1 className="movieShowcase__heading">{heading}</h1>
        <div className="movieShowcase__flex">
          <span onClick={this.scrollLeft} className="movieShowcase__left-arrow"><svg focusable="false" data-prefix="fas" data-icon="chevron-left" className="svg-inline--fa fa-chevron-left fa-w-10 movieShowcase__left-arrow-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"></path></svg></span>
          <span onClick={this.scrollRight} className="movieShowcase__right-arrow"><svg focusable="false" data-prefix="fas" data-icon="chevron-right" className="svg-inline--fa fa-chevron-right fa-w-10 movieShowcase__right-arrow-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg></span>
          <div className="movieShowcase__container">
            {movies}
          </div>
        </div>
      </>
    ) : (<></>);
  }
}
