import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../config";
import { SwiperSlide, Swiper } from "swiper/react";

import { Player } from "react-tuby";
import "react-tuby/css/main.css";
import MovieCard from "../components/movie/MovieCard";
const MovieDetailPage = () => {
    const { movieId } = useParams();
    const { data, error } = useSWR(tmdbAPI.getMovieDetails(movieId), fetcher);
    if (!data) return null;
    const { backdrop_path, poster_path, title, genres, overview } = data;
    return (
        <div className="py-10 page-container">
            <div className="relative w-full h-[500px]">
                <div className="absolute inset-0 bg-black bg-opacity-70"></div>
                <div
                    className="w-full h-full bg-cover bg-no-repeat"
                    style={{
                        backgroundImage: `url(${tmdbAPI.imageOriginal(
                            backdrop_path
                        )})`,
                    }}
                ></div>
            </div>
            <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
                <img
                    src={tmdbAPI.imageOriginal(poster_path)}
                    className="w-full h-full object-cover rounded-xl"
                    alt=""
                />
            </div>
            <h1 className="text-center text-4xl font-bold text-white mb-10">
                {title}
            </h1>
            {genres.length > 0 && (
                <div className="flex items-start justify-center gap-x-5 mb-10">
                    {genres.map((item) => (
                        <span
                            key={item.id}
                            className="text-primary border border-primary px-6 py-3 rounded-lg transition-all hover:bg-white"
                        >
                            {item.name}
                        </span>
                    ))}
                </div>
            )}
            <p className="text-center leading-relaxed max-w-[600px] mx-auto mb-10 text-white">
                {overview}
            </p>
            <MovieCredits></MovieCredits>
            <MovieVideo></MovieVideo>
            <MovieSimilar></MovieSimilar>
        </div>
    );
};
const MovieCredits = () => {
    const { movieId } = useParams();
    const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "credits"), fetcher);
    if (!data) return null;
    const { cast } = data;
    if (!cast || cast.length <= 0) return null;
    return (
        <div className="py-10">
            <h2 className="text-center text-3xl text-white font-bold mb-10">
                Casts
            </h2>
            <div className="grid grid-cols-4 gap-5">
                {cast.slice(0, 4).map((item) => (
                    <div className="cats-item text-white" key={item.id}>
                        <img
                            src={tmdbAPI.imageOriginal(item.profile_path)}
                            alt=""
                            className="w-full h-[350px] object-cover rounded-lg mb-3"
                        />
                        <span className="block text-lg">{item.name}</span>
                        <span className="opacity-50">{item.character}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
const MovieVideo = () => {
    const { movieId } = useParams();
    const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "videos"), fetcher);
    if (!data) return null;
    const { results } = data;
    if (!results || results.length <= 0) return null;
    return (
        <div className="mb-10">
            <div className="flex flex-col gap-10">
                {results.slice(0, 2).map((item) => (
                    <div key={item.id}>
                        <h3 className="bg-purple-400 inline-block p-3 rounded-lg text-white">
                            {item.name}
                        </h3>
                        <div className="w-full aspect-video">
                            <iframe
                                width="864"
                                height="486"
                                src={`https://www.youtube.com/embed/${item.key}`}
                                title="Youtube player video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full object-fill"
                            ></iframe>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
const MovieSimilar = () => {
    const { movieId } = useParams();
    const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "similar"), fetcher);
    if (!data) return null;
    const { results } = data;
    if (!results || results.length <= 0) return null;
    return (
        <div className="py-10">
            <h3 className="text-3xl text-white font-bold">Simalar movies</h3>
            <div className="movie-list">
                <Swiper
                    grabCursor={"true"}
                    spaceBetween={25}
                    slidesPerView={"auto"}
                >
                    {results.map((item) => (
                        <SwiperSlide key={item.id}>
                            <MovieCard movie={item}></MovieCard>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};
export default MovieDetailPage;
