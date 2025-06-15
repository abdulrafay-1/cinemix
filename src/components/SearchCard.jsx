import React, { memo } from 'react'
import { useNavigate } from 'react-router';

const SearchCard = ({ id, img, title }) => {
    const navigate = useNavigate()

    return (
        <div
            onClick={() => navigate(`/movie/${id}`)}
            className='rounded-md cursor-pointer p-2 bg-gray-600 flex gap-3 w-[268px] max-w-[268px] items-center'>
            <div className='size-12 shrink-0'>
                <img
                    src={`https://image.tmdb.org/t/p/w500${img}`}
                    onError={(e) => {
                        e.target.onerror = null; // Prevents infinite loop in case the fallback also fails
                        e.target.src = `https://placehold.co/100x100?text=${title}`;
                    }}
                    alt="" className='object-cover rounded-sm size-12 0' />
            </div>
            <p className='text-sm text-white/75'>{title}</p>
        </div>
    )
}

export default memo(SearchCard)