import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import { fetcher } from "../../config";
//https://api.themoviedb.org/3/movie/now_playing?api_key=c939ff22c7ff31f41832510d12d9d9c1
const MovieList = ({ type }) => {
    const [movies, setMovies] = useState([]);
    const { data, error } = useSWR(
        `https://api.themoviedb.org/3/movie/${type}?api_key=c939ff22c7ff31f41832510d12d9d9c1`,
        fetcher
    );
    useEffect(() => {
        if (data && data.results) setMovies(data.results);
    }, [data]);
    return (
        <div className="movie-list flex ">
            <Swiper spaceBetween={25} grabCursor="true" slidesPerView={"auto"}>
                {movies.map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <MovieCard movie={movie}></MovieCard>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MovieList;
