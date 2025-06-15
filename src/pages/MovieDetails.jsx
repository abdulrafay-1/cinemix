import React from 'react';
import { useNavigate, useParams } from 'react-router';
import useFetchApi from '../hooks/useFetchApi';

const MovieDetails = () => {
    const { id } = useParams();
    const { loading, data, error } = useFetchApi(`/movie/${id}`);
    const navigate = useNavigate();

    if (loading) return <div className="text-center text-white pt-10 bg-black/80 h-dvh">Loading...</div>;
    if (error) return <div className="text-red-500 text-center pt-10 bg-black/80 h-dvh">Error: Movie not found !</div>;
    if (!data) return null;

    const {
        title,
        original_title,
        overview,
        genres,
        release_date,
        backdrop_path,
        poster_path,
        production_companies,
        budget,
        revenue,
        runtime,
        homepage,
        spoken_languages,
        imdb_id,
        tagline,
        vote_average,
        vote_count,
        original_language,
        origin_country
    } = data;

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Backdrop */}
            <div
                className="relative bg-cover bg-center h-[60vh] md:h-[70vh] flex items-center justify-center"
                style={{
                    backgroundImage: `url("https://image.tmdb.org/t/p/original${backdrop_path}")`,
                    backgroundPosition: "top"
                }}
            >
                {/* Gradient overlay from light (top) to dark (bottom) */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(0,0,0,0.9))"
                    }}
                ></div>
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-6 cursor-pointer flex items-center gap-1 left-6 bg-white bg-opacity-90 text-black px-4 py-2 rounded-full font-semibold hover:bg-opacity-100 transition z-20 shadow-lg"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                    Back
                </button>

                <h1 className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-extrabold text-center text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                    {title}
                </h1>
            </div>


            {/* Main Content */}
            <div className="max-w-6xl mx-auto p-6 md:p-12 grid md:grid-cols-3 gap-8">
                {/* Poster */}
                <div className="md:col-span-1 flex justify-center">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                        alt={title}
                        className="rounded-2xl shadow-xl w-full max-w-xs md:max-w-sm object-cover"
                    />
                </div>

                {/* Info */}
                <div className="md:col-span-2 space-y-5">
                    <div>
                        <p className="text-sm text-gray-400">
                            Original Title: <span className="text-white">{original_title}</span>
                        </p>
                        <p className="text-sm text-gray-400">
                            Language: <span className="uppercase">{original_language}</span>
                        </p>
                        <p className="text-sm text-gray-400">
                            Country: {origin_country?.join(', ')}
                        </p>
                        <p className="text-sm text-gray-400">
                            Released on: <span className="text-white">{release_date}</span>
                        </p>
                    </div>

                    {tagline && <p className="italic text-red-500">“{tagline}”</p>}

                    <div className="flex flex-wrap gap-2">
                        {genres?.map((genre) => (
                            <span
                                key={genre.id}
                                className="px-3 py-1 text-sm rounded-full bg-red-600 text-white font-medium"
                            >
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    <p className="text-gray-300 leading-relaxed">{overview}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                        <p><span className="text-white font-semibold">Runtime:</span> {runtime} min</p>
                        <p><span className="text-white font-semibold">Budget:</span> ${budget.toLocaleString()}</p>
                        <p><span className="text-white font-semibold">Revenue:</span> ${revenue.toLocaleString()}</p>
                        <p><span className="text-white font-semibold">Rating:</span> {vote_average} ⭐ ({vote_count} votes)</p>
                    </div>

                    {/* Spoken Languages */}
                    <div>
                        <h3 className="font-semibold mt-4">Spoken Languages:</h3>
                        <ul className="flex flex-wrap gap-3 mt-2 text-sm text-gray-300">
                            {spoken_languages?.map(lang => (
                                <li key={lang.iso_639_1}>
                                    <span className="bg-gray-800 px-2 py-1 rounded">{lang.english_name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Production Companies */}
                    <div>
                        <h3 className="font-semibold mt-4">Production Companies:</h3>
                        <ul className="list-disc list-inside text-gray-300">
                            {production_companies?.map((company) => (
                                <li key={company.id}>
                                    {company.name} {company.origin_country && `(${company.origin_country})`}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-4 mt-6">
                        {homepage && (
                            <a
                                href={homepage}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-red-600 hover:text-white transition"
                            >
                                Official Website
                            </a>
                        )}
                        {imdb_id && (
                            <a
                                href={`https://www.imdb.com/title/${imdb_id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold hover:bg-yellow-500 transition"
                            >
                                IMDb Page
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
