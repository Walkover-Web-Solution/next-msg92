import React from 'react';

export default function PlansSkeleton() {
    return (
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4'>
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className='h-96 animate-pulse rounded-2xl border border-gray-100 bg-gray-50' />
            ))}
        </div>
    );
}
