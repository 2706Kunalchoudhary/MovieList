import axios from "axios";

export const movieList = async () => {

    return await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=6dad78b667fc7aa9d9caa4aa131c343c")
}