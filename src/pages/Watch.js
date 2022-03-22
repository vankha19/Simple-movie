import React from "react";
import { useParams } from "react-router-dom";
import Swiper from "swiper";
import { SwiperSlide } from "swiper/react";
import useSWR from "swr";
import MovieCard from "../components/movie/MovieCard";
import { fetcher, tmdbAPI } from "../config";

const Watch = () => {
    const { movieId } = useParams();

    return (
        <div className="mt-24">
            <MovieVideo></MovieVideo>
        </div>
    );
};
const MovieVideo = () => {
    const { movieId } = useParams();
    const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "videos"), fetcher);
    console.log(data);
    if (!data) return null;
    const { results } = data;
    if (!results || results.length <= 0) return null;
    return (
        <div className="mb-10">
            <div className="flex flex-col gap-10">
                {results.slice(0, 1).map((item) => (
                    <div key={item.id}>
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
            <h3 className="text-3xl text-white font-bold">Similar movies</h3>
            <div className="movie-list">
                <Swiper
                    grabCursor={"true"}
                    spaceBetween={40}
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

export default Watch;
