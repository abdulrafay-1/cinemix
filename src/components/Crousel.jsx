import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useFetchApi from "../hooks/useFetchApi";
import { useNavigate } from "react-router";

const HeroCarousel = () => {
    const { data: popularMovies, loading } = useFetchApi("/movie/popular");
    const navigate = useNavigate();

    if (loading || !popularMovies) {
        return (
            <div className="relative w-full h-[80vh] bg-gray-900 animate-pulse"></div>
        );
    }

    return (
        <div className="relative w-full h-[60vh] md:h-[80vh]">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation={{
                    nextEl: ".custom-next",
                    prevEl: ".custom-prev"
                }} pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                loop
                className="h-full relative"
            >
                <button className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer text-red-500 text-3xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6" /></svg>
                </button>
                <button className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer text-red-500 text-3xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>
                </button>
                {popularMovies.results.slice(0, 5).map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <div
                            className="w-full h-full bg-cover bg-center relative" style={{
                                backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.9) 25%, rgba(0, 0, 0, 0.1) 100%), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                            }}
                        >
                            <div className="absolute inset-0 flex items-center justify-start px-10">
                                <div className="text-white max-w-xl space-y-4">
                                    <h1 className="text-4xl md:text-5xl font-bold">{movie.title}</h1>
                                    <p className="text-gray-300 md:block">
                                        {movie.overview}
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => navigate(`/movie/${movie.id}`)}
                                            className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white font-semibold"
                                        >
                                            View Details
                                        </button>
                                        <div className="flex items-center gap-2">
                                            <span className="text-yellow-400">⭐</span>
                                            <span className="text-white">{movie.vote_average.toFixed(1)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HeroCarousel;
