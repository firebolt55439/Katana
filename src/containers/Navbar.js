import React, { Component } from 'react';
import NavigationItem from '../components/NavigationItem'
import SearchLogo from '../static/images/search-icon.svg';
// import KatanaLogo from '../static/images/Netflix_Logo_RGB.png';
import KatanaLogo from '../static/images/logo.png';
import BellLogo from '../static/images/bell-logo.svg';
import DropdownArrow from '../static/images/drop-down-arrow.svg';
import DropdownContent from "../components/DropdownContent";


class navigation extends Component {
  state = {
    scrolling: false
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  /** changes the scrolling state depending on the Y-position */
  handleScroll = (event) => {
    if (window.scrollY === 0) {
      this.setState({ scrolling: false });
    }
    else if (window.scrollY > 50) {
      this.setState({ scrolling: true });
    }
  }


  render() {
    const { scrolling } = this.state;
    const { showMovies } = this.props.handlers;

    return (
      <nav className={"navigation " + (scrolling ? "black" : "")} >
        <ul className="navigation__container">
          <NavigationItem link="/" exact><img className="navigation__container--logo" src={KatanaLogo} alt="" /></NavigationItem>
          {/*<div className="navigation__container-link nav-link">Home</div>
          <div className="navigation__container-link nav-link">TV Shows</div>
          <div className="navigation__container-link nav-link">Movies</div>
          <div className="navigation__container-link nav-link">Recently Added</div>
          <div className="navigation__container-link nav-link">My List</div>*/}


          <div className="navigation__container--left">
            <SearchLogo className="logo" />

            <input
              onChange={showMovies}
              className="navigation__container--left__input"
              type="text"
              placeholder="Movies, television, and more" />

          </div>

          <BellLogo className="navigation__container--bellLogo" />

          <DropdownContent />
          <DropdownArrow className="navigation__container--downArrow" />

        </ul>
      </nav>
    )
  }
}

export default navigation; 
