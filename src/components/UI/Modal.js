import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Backdrop from './Backdrop'


export default class Modal extends Component {
   constructor(props) {
     super(props);
     this.escFunction = this.escFunction.bind(this);
   }

   escFunction(event){
      if (event.keyCode === 27) {
         this.props.modalClosed();
      }
   }

   componentDidMount(){
     document.addEventListener("keydown", this.escFunction, false);
   }
   componentWillUnmount(){
     document.removeEventListener("keydown", this.escFunction, false);
   }

   render() {
      const path = this.props.movie.backdrop_path || this.props.movie.poster_path;
      const backgroundStyle = {
         backgroundSize: "cover",
         backgroundImage: (path ? `url(https://image.tmdb.org/t/p/original/${path})` : ``),
      }

      return (
         <Aux>
            <Backdrop show={this.props.show} toggleBackdrop={this.props.modalClosed} />
            <div
               style={backgroundStyle}
               className={(this.props.show ? "modal show" : "modal hide")}>
               {this.props.children}
            </div>
         </Aux>
      );
   }
}
