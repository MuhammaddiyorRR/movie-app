import { Component } from "react";
import NavBar from "./components/nav-bar";
import Genres from "./components/genres";
import Movies from "./components/movies";
// import Loader from "./components/loader";
import Total from "./components/total";
import { paginate } from "./helpers/paginate";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/base.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const endPoint = "http://localhost:8000/api/movies";


class App extends Component {
  state = {
    loading: true,
    movies: [],
    genres: [],
    genreID: "all",
    currentPage: 1,
    pageSize: 3,
  };
  
// console.log("knknk");
  // handleSelectGenre = (newGenreID) => {
  //   this.setState({ genreID: newGenreID, currentPage: 1 });
  // };

  // handlePageChange = (newPage) => {
  //   this.setState({ currentPage: newPage });
  // };

  // handleLike = (movieID) => {
  //   const movies = [...this.state.movies];
  //   const movie = movies.find((movie) => movie._id === movieID);

  //   movie.isLiked = !movie.isLiked;
  //   this.setState({ movies });
  // };

  async componentDidMount() {
    // const movieRes = await fetch("http://localhost:8000/api/movies");
       axios
         .get(endPoint)
         .then((response) => this.setState({ movies: response.data }));
    // const movies = await movieRes.json();
    console.log(this.state.response.data.moives);

    // const _movies = (await axios(endPoint)).data;
    // this.setState({ loading: false, _movies });

    // const genreRes = await fetch("http://localhost:8000/api/genres");
     axios
       .get("http://localhost:8000/api/genres")
       .then((response) => this.setState({ genres: response.data.genres }));
    // const genres = await genreRes.json();
    // genres.unshift({ name: "All", _id: "all" });
    // setTimeout(() => this.setState({ loading: false, movies, genres }), 1000);
  }

  handleDelete = (selectId) => {
    const newMovies = this.state.movies.filter(
      ({ movie }) => movie._id !== selectId
      );
      this.setState({ movies: newMovies });
      console.log(newMovies);
    try {
      toast.success("success", selectId);
    } catch (error) {}
    // axios.delete(${URL}/movies/${selectId}).then((response) => {
    //   console.log(response, "success delete");
    // })
  };

  render() {
    // if (this.state.loading) return <Loader />;

    const { movies, genres, genreID, pageSize, currentPage } = this.state;

    const filteredMovies = movies.filter(
      (movie) => genreID === "all" || movie.genre._id === genreID
    );
    const paginatedMovies = paginate(filteredMovies, pageSize, currentPage);

    const total = filteredMovies.length;
    return (
      <>
        <NavBar />
        <div className="container pt-4">
          <div className="row d-flex">
            <Genres
              genres={genres}
              genreID={genreID}
              onSelect={this.handleSelectGenre}
            />
            <div className="col">
              <Total total={total} />
              <Movies
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={this.handlePageChange}
                movies={paginatedMovies}
                onLike={this.handleLike}
                total={total}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
