import React, { useEffect, useState } from "react";
import useSWR from "swr";
import MovieCard from "../components/movie/MovieCard";
import { fetcher, apiKey, tmdbAPI } from "../config";
import useDebounce from "../hook/useDebounce";
import ReactPaginate from "react-paginate";
const itemsPerPage = 20;
const MoviePage = () => {
    const [pageCount, setPageCount] = useState(0);
    const [movies, setMovies] = useState([]);
    const [filter, setFilter] = useState("");
    const [itemOffset, setItemOffset] = useState(0);
    const [url, setUrl] = useState(tmdbAPI.getMovieList("popular"));
    const [nextPage, setNextPage] = useState(1);
    const filterDebounce = useDebounce(filter, 1000);
    const { data, error } = useSWR(url, fetcher);
    const loading = !data && !error;

    useEffect(() => {
        if (data && data.results) setMovies(data.results);
    }, [data]);
    console.log(data);
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };
    useEffect(() => {
        if (filterDebounce) setUrl(tmdbAPI.getMovieSearch(filter, nextPage));
        else setUrl(tmdbAPI.getMovieList("popular", nextPage));
    }, [filterDebounce, nextPage]);

    useEffect(() => {
        if (!data || !data.total_results) return;
        setPageCount(Math.ceil(data.total_results / itemsPerPage));
    }, [data, itemOffset]);
    const handlePageClick = (e) => {
        const newOffset = (e.selected * itemsPerPage) % data.total_results;
        setItemOffset(newOffset);
        setNextPage(e.selected + 1);
    };
    return (
        <div className="py-10 page-container">
            <div className="flex mb-10">
                <div className="flex-1 ">
                    <input
                        className="bg-slate-700 w-full p-4 outline-none text-white "
                        placeholder="Type search key ..."
                        type="text"
                        onChange={handleFilterChange}
                    />
                </div>
                <button className="p-4 bg-primary text-white">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
            </div>
            {loading && (
                <div className=" mx-auto w-6 h-6 border-2 border-blue-500 rounded-full border-t-2 border-t-transparent animate-spin"></div>
            )}
            {!loading && (
                <div className="grid grid-cols-4 gap-5">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie}></MovieCard>
                    ))}
                </div>
            )}
            <div className="mt-10 text-white">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    className="pagination"
                />
            </div>
        </div>
    );
};

export default MoviePage;
