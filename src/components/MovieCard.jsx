import React, { memo, useEffect } from "react";
import { useNavigate } from "react-router";
const MovieCard = ({ movie }) => {
    const {
        title,
        poster_path,
        vote_average,
        release_date,
        overview,
    } = movie;
    const navigate = useNavigate();

    const truncate = (text, maxLength) =>
        text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

    return (
        <div
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="bg-gray-900 rounded-2xl h-[450px] overflow-hidden cursor-pointer shadow-md shadow-black/30 hover:shadow-indigo-600/40 transition duration-300 w-[220px]">
            <img
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                alt={title}
                className="w-full h-[276px] md:h-[300px] object-cover"
            />
            <div className="p-3 flex flex-col gap-1 text-gray-200">
                <h3 className="text-base font-semibold text-white leading-tight">
                    {truncate(title, 30)}
                </h3>
                <p className="text-xs text-gray-400">{release_date}</p>
                <div className="flex items-center gap-1 text-yellow-400 text-sm">
                    <span>🌟</span>
                    <span>{vote_average?.toFixed(1)}</span>
                </div>
                <p className="text-xs text-gray-300 mt-1">
                    {truncate(overview, 70)}
                </p>
            </div>
        </div>
    );
};


export default memo(MovieCard);
