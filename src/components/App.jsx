import React from "react";
import MovieItem from "./MovieItem"
import { API_URL, API_KEY_3 } from "../utils/api"

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      moviesWillWatch: []
    }

    //this.removeMovie = this.removeMovie.bind(this); - if removeMovie is not '=>' function
  }

  componentDidMount() {
    console.log("didMount")
    fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=revenue.desc`).then((response) => {
      console.log("then");
      return response.json()
    }).then((data) => {
      console.log("then2", data)
      this.setState({ movies: data.results })
    })
  }

  removeMovie = (movie) => {
    const updateMovies = this.state.movies.filter(function (item) {
      return item.id !== movie.id;
    })
    this.setState({ movies: updateMovies });
  }

  addMovieToWillWatch = (movie) => {
    const updateWillWatch = [...this.state.moviesWillWatch, movie];
    this.setState({ moviesWillWatch: updateWillWatch });
  }

  removeMovieFromWillWatch = (movie) => {
    const updateWillWatch = this.state.moviesWillWatch.filter(function (item) {
      return item.id !== movie.id;
    });
    this.setState({ moviesWillWatch: updateWillWatch });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-9">
            <div className="row">
              {this.state.movies.map((movie) => {
                return (<div className="col-6 mb-4" key={movie.id}>
                  <MovieItem movie={movie} removeMovie={this.removeMovie} addMovieToWillWatch={this.addMovieToWillWatch} removeMovieFromWillWatch={this.removeMovieFromWillWatch} />
                </div>);
              })}
            </div>
          </div>
          <div className="col-3">
            <p>Will Watch: {this.state.moviesWillWatch.length}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
