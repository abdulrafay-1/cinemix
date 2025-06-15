import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonMovieCard = () => {
    return (
        <SkeletonTheme
            baseColor="#2c2f36"
            highlightColor="#3f444d"
            width={220}
            height={450}
            
        >
            <div className="bg-[#0f172a] rounded-2xl overflow-hidden shadow-md w-[220px] h-[450px]">
                {/* Poster Skeleton */}
                <Skeleton height={300} width="100%" style={{ borderRadius: '0' }} />

                {/* Card Content */}
                <div className="p-3 space-y-2">
                    <Skeleton height={20} width="80%" />
                    <Skeleton height={14} width="50%" />

                    <div className="flex items-center gap-2">
                        <Skeleton circle height={18} width={18} />
                        <Skeleton height={14} width="30%" />
                    </div>

                    <Skeleton count={2} height={12} />
                </div>
            </div>
        </SkeletonTheme>
    );
};

export default SkeletonMovieCard;
