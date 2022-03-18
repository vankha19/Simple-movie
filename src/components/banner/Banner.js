import React from "react";
import { Autoplay } from "swiper";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import { fetcher } from "../../config";
const Banner = () => {
    const { data, error } = useSWR(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=c939ff22c7ff31f41832510d12d9d9c1`,
        fetcher
    );
    const movies = data?.results || [];

    return (
        <section className="banner h-[500px] page-container mb-20 overflow-hidden">
            <Swiper
                modules={[Autoplay]}
                grabCursor="true"
                slidesPerView={"auto"}
                autoplay={{ delay: 3000 }}
            >
                {movies.map((item) => (
                    <SwiperSlide key={item.id}>
                        <BannerItem item={item}></BannerItem>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};
const BannerItem = ({ item }) => {
    const { title, vote_average, release_date, poster_path } = item;

    return (
        <div className="w-full h-full rounded-lg relative">
            <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg "></div>
            <img
                src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                alt=""
                className="w-full h-full object-cover rounded-lg object-center"
            />
            <div className="absolute left-5 bottom-5 w-full text-white">
                <h2 className="font-bold text-3xl mb-5">{title}</h2>
                <div className="flex items-center gap-x-3 mb-5">
                    <span className="py-2 px-4 border border-white rounded-lg">
                        Action
                    </span>
                    <span className="py-2 px-4 border border-white rounded-lg">
                        Adventure
                    </span>
                    <span className="py-2 px-4 border border-white rounded-lg">
                        Adventure
                    </span>
                </div>
                <button className="py-3 px-8 bg-primary rounded-lg font-medium">
                    Watch
                </button>
            </div>
        </div>
    );
};
export default Banner;
