import React from "react";
import moviesData from "../moviesData";

let title = "Hello ReactWarriors";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: moviesData
    }
  }
  render() {
    console.log(this);
    return <div>{this.state.movies.map(function (movie) {
      return <p>{movie.title}</p>
    })}</div>;
  }
}

export default App;
