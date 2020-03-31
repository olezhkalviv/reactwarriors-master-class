import React from "react";

const MovieItem = (props) => {
    return (
        <div key={props.movie.id}>
            <p>{props.movie.title}</p>
            <button onClick={props.removeMovie.bind(null, props.movie)}>Delete Movie</button>
        </div>
    );
}

export default MovieItem;