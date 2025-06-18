import React, { useEffect, useState } from 'react'
import SearchCard from './SearchCard';
import useFetchApi from '../hooks/useFetchApi';
import moviesInstance from '../axios/movies.instace';

const Navbar = () => {
    const [searchInput, setSearchInput] = useState("")
    const [debouncedSearchInput, setDebouncedSearchInput] = useState("")
    const [searchData, setSearchData] = useState([])
    const [isFocused, setIsFocused] = useState(false);
    const [loading, setLoading] = useState(false)

    // Debounce effect
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchInput(searchInput);
        }, 400);

        return () => {
            clearTimeout(handler);
        };
    }, [searchInput]);

    useEffect(() => {
        console.log(debouncedSearchInput)
        const searchMovies = async () => {
            if (debouncedSearchInput.trim()) {
                setSearchData([])
                setLoading(true)
                try {
                    const response = await moviesInstance(`/search/movie?query=${debouncedSearchInput}&include_adult=false`)
                    console.log(response.data.results)
                    setSearchData(response.data.results)
                } catch (error) {
                    console.log(error)
                } finally {
                    setLoading(false)
                }
            }
        }
        searchMovies()
    }, [debouncedSearchInput])

    useEffect(() => {
        if (!isFocused) {
            const timeout = setTimeout(() => {
                setSearchData([]);
            }, 200); // delay to allow clicking on results
            return () => clearTimeout(timeout);
        }
    }, [isFocused]);

    return (
        <div className="flex justify-center items-center w-full">
            <h1 className="text-center flex items-center justify-center text-3xl md:text-5xl font-extrabold tracking-wider pt-3 text-white drop-shadow-[0_2px_4px_rgba(255,0,0,0.7)]">
                <span>🎬</span><span className="text-red-600">Cine</span><span className="text-white">mix</span>
            </h1>

            <div className="ml-auto">
                <div className="relative">
                    <div className="absolute top-7 left-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="search movie"
                        value={searchInput}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onChange={e => setSearchInput(e.target.value)}
                        className="bg-gray-900 placeholder:text-gray-400 mx-2 mt-5 focus:w-[200px] md:focus:w-[268px] transition-all ease-in-out duration-500 border-gray-400 border rounded-md px-2 py-2 pl-8 focus:outline-none text-gray-300 w-44 md:w-[200px]"
                    />
                    {loading && <div className='absolute z-10'>
                        <div className='flex flex-col gap-2'>
                            <SearchCard title={`loading`} img={`loading`} />
                        </div></div>}
                    {!!searchData?.length && <div className="absolute z-10 right-2">
                        <div className='overflow-y-auto scrollbar-hide max-h-[300px] p-3 bg-gray-900 rounded-md' >
                            <div className='flex flex-col gap-2'>
                                {searchData.map(item => <SearchCard key={item.id} id={item.id} title={item.title} img={item.poster_path} />)}
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Navbar