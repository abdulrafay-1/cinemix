import React, { useEffect, useState } from 'react'
import moviesInstance from './axios/movies.instace'
import MovieCard from './components/MovieCard'
import useFetchApi from './hooks/useFetchApi'
import SkeletonMovieCard from './components/SkeletonMovieCard'
import Navbar from './components/Navbar'
import HeroCarousel from './components/Crousel'

const App = () => {
  const { data: popular, loading: popularLoading } = useFetchApi("/movie/popular");
  const { data: topRated, loading: topRatedLoading } = useFetchApi("/movie/top_rated");
  const { data: upComing, loading: upComingLoading } = useFetchApi("/movie/upcoming");

  // console.log(popular, topRated, upComing)

  return (
    <div className='bg-black'>
      <Navbar />
      <div className='mt-3'>
        <HeroCarousel />
      </div>
      <div>
        <div className="p-4 overflow-x-auto scrollbar-hide">
          <h2 className='text-3xl text-white font-medium mb-4'>Popular Movies</h2>
          <div className="flex gap-6">
            {popularLoading && [1, 2, 3, 4].map(item => <div key={item} className='shrink-0'><SkeletonMovieCard /></div>)}
            {popular?.results?.map((movie) => (
              <div key={movie.id} className="shrink-0">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 overflow-x-auto scrollbar-hide">
          <h2 className='text-3xl text-white font-medium mb-4'>Top-Rated Movies</h2>
          <div className="flex gap-6">
            {topRatedLoading && [1, 2, 3, 4].map(item => <SkeletonMovieCard key={item} />)}

            {topRated?.results?.map((movie) => (
              <div key={movie.id} className="flex-shrink-0">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 overflow-x-auto scrollbar-hide">
          <h2 className='text-3xl text-white font-medium mb-4'>Upcoming Movies</h2>
          <div className="flex gap-6">
            {upComingLoading && [1, 2, 3, 4].map(item => <SkeletonMovieCard key={item} />)}

            {upComing?.results?.map((movie) => (
              <div key={movie.id} className="flex-shrink-0">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default App