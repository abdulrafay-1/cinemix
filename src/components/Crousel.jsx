import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const movies = [
    {
        id: 1,
        title: "The Dark Knight",
        image: "https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    },
    {
        id: 2,
        title: "Inception",
        image: "https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    },
    {
        id: 3,
        title: "Interstellar",
        image: "https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    },
];

const HeroCarousel = () => {
    return (
        <div className="relative w-full h-[80vh]">            <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            loop
            className="h-full"
        >
            {movies.map((movie) => (
                <SwiperSlide key={movie.id}>
                    <div
                        className="w-full h-full bg-cover bg-center relative"
                        style={{
                            backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.1)), url(${movie.image})`,
                        }}
                    >
                        <div className="absolute inset-0 flex items-center justify-start px-10">
                            <div className="text-white max-w-xl space-y-4">
                                <h1 className="text-4xl md:text-5xl font-bold">{movie.title}</h1>
                                <p className="text-gray-300 hidden md:block">
                                    A visually stunning and emotionally resonant story from the visionary filmmaker.
                                </p>
                                <button className="mt-4 px-5 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white font-semibold">
                                    Watch Now
                                </button>
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
