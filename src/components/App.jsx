import React from "react";
import MovieItem from "./MovieItem"
import MovieTabs from "./MovieTabs"
import { API_URL, API_KEY_3 } from "../utils/api"

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      moviesWillWatch: [],
      page: 1,
      pagesTotal: 1,
      sort_by: "popularity.desc"
    }

    //this.removeMovie = this.removeMovie.bind(this); - if removeMovie is not '=>' function
  }

  componentDidMount() {
    this.getMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sort_by !== this.state.sort_by || prevState.page !== this.state.page) {
      this.getMovies();
    }
  }

  getMovies = () => {
    fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}&page=${this.state.page}`).then((response) => {
      return response.json()
    }).then((data) => {
      this.setState({ movies: data.results, pagesTotal: data.total_pages })
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

  updateSortBy = value => {
    this.setState({
      page: 1,
      sort_by: value
    })
  }

  nextPage = () => {
    this.setState({
      page: this.state.page + 1
    })
  }

  previousPage = () => {
    this.setState({
      page: this.state.page - 1
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-9">
            <div className="row mb-4">
              <div className="col-12">
                <MovieTabs sort_by={this.state.sort_by} updateSortBy={this.updateSortBy} />
              </div>
            </div>
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
        <div className="row mt-4">
          <div className="col-9">
            <div className="row mb-4">
              <div className="col-4" style={{textAlign: "left"}}>
              {this.state.page > 1 ? (
                  <button onClick={this.previousPage}>PREVIOUS</button>
              ) : ""}
              </div>
              <div className="col-4" style={{textAlign: "center"}}>
                {this.state.page} / {this.state.pagesTotal}
              </div>
              <div className="col-4" style={{textAlign: "right"}}>
              {this.state.page !== this.state.pagesTotal ? (
                  <button onClick={this.nextPage}>NEXT</button>
              ) : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
