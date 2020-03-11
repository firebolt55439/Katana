import React from 'react'

export default function MovieGenreImage(props) {
   let netflixUrl = false;

   if (props.url.indexOf("with_networks=213") !== -1) {
      netflixUrl = true;
   }

   return (
      <div onClick={props.movieDetailsModal}
         className={"movieShowcase__container--movie" + (netflixUrl ? "__netflix" : "")}>
         <img src={props.posterUrl} className="movieShowcase__container--movie-image" />
      </div>
   );
}
