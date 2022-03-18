import "./App.css";
import { Fragment } from "react";
import MovieList from "./components/movie/MovieList";
import Banner from "./components/banner/Banner";
import "swiper/css";
import Header from "./components/layout/Header";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import Main from "./components/layout/Main";
import MoviePage from "./pages/MoviePage";
import MovieDetailPage from "./pages/MovieDetailPage";
function App() {
    return (
        <Fragment>
            <Routes>
                <Route element={<Main></Main>}>
                    <Route path="/" element={<HomePage></HomePage>}></Route>
                    <Route
                        path="/movies"
                        element={<MoviePage></MoviePage>}
                    ></Route>
                    <Route
                        path="/movie/:movieId"
                        element={<MovieDetailPage> </MovieDetailPage>}
                    ></Route>
                </Route>
                {/* <Route path="*" element={<div>Page not found</div>}></Route> */}
            </Routes>
        </Fragment>
    );
}

export default App;
