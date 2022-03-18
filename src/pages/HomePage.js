import React, { Fragment } from "react";
import Banner from "../components/banner/Banner";
import MovieList from "../components/movie/MovieList";

const HomePage = () => {
    return (
        <Fragment>
            <Banner></Banner>

            <section className="page-container mb-20 ">
                <h2 className="text-3xl text-white font-bold capitalize mb-10">
                    Now playing
                </h2>
                <MovieList type={"now_playing"}></MovieList>
            </section>
            <section className="page-container mb-20 ">
                <h2 className="text-3xl text-white font-bold capitalize mb-10">
                    Top rating
                </h2>
                <MovieList type={"top_rated"}></MovieList>
            </section>
            <section className="page-container mb-20 ">
                <h2 className="text-3xl text-white font-bold capitalize mb-10">
                    Popular
                </h2>
                <MovieList type={"popular"}></MovieList>
            </section>
        </Fragment>
    );
};

export default HomePage;
