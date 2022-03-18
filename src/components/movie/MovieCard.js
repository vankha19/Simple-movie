import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
const MovieCard = ({ movie }) => {
    const { title, vote_average, release_date, poster_path, id } = movie;
    const navigate = useNavigate();
    return (
        <div className="movie-card flex flex-col bg-slate-800 p-3 rounded-lg text-white h-full select-none">
            <img
                src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                alt=""
                className=" object-cover rounded-lg mb-5"
            />
            <div className="flex flex-col flex-1">
                <span className="text-xl">{title}</span>
                <div className="flex items-center justify-between text-sm opacity-50 mb-5">
                    <span>{new Date(release_date).getFullYear()} </span>
                    <span>{vote_average}</span>
                </div>
                <Button
                    bgColor="primary"
                    onClick={() => navigate(`/movie/${id}`)}
                >
                    Watch now
                </Button>
            </div>
        </div>
    );
};

export default MovieCard;
