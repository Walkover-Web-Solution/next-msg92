import React from 'react';

export default function ChatBotDemoPagination({ currentPage, totalPages, onPageChange }) {
    const renderPaginationItems = () => {
        let items = [];
        const ellipsis = <span className='pagination-ellipsis'>...</span>;

        // Always add the first page
        items.push(
            <div
                key='page-1'
                className={`w-[24px] h-[24px] flex items-center justify-center hover:bg-primary hover:text-white cursor-pointer rounded-sm ${
                    currentPage === 1 ? 'bg-primary text-white' : ''
                }`}
                onClick={() => onPageChange(1)}
            >
                1
            </div>
        );

        // Add ellipsis if needed after the first page
        if (currentPage > 3) {
            items.push(ellipsis);
        }

        // Calculate the range of pages to show around the current page
        let startPage = Math.max(2, currentPage - 1);
        let endPage = Math.min(totalPages - 1, currentPage + 1);

        for (let i = startPage; i <= endPage; i++) {
            items.push(
                <div
                    key={`page-${i}`}
                    className={`w-[24px] h-[24px] flex items-center justify-center hover:bg-primary hover:text-white cursor-pointer rounded-sm ${
                        currentPage === i ? 'bg-primary text-white' : ''
                    }`}
                    onClick={() => onPageChange(i)}
                >
                    {i}
                </div>
            );
        }

        // Add ellipsis if needed before the last page
        if (currentPage < totalPages - 2) {
            items.push(ellipsis);
        }

        // Always add the last page
        items.push(
            <div
                key={`page-${totalPages}`}
                className={`w-[24px] h-[24px] flex items-center justify-center hover:bg-primary hover:text-white cursor-pointer rounded-sm ${
                    currentPage === totalPages ? 'bg-primary text-white' : ''
                }`}
                onClick={() => onPageChange(totalPages)}
            >
                {totalPages}
            </div>
        );

        return items;
    };

    return (
        <div className='flex gap-4'>
            {1 != currentPage && (
                <div
                    className='w-fit h-[24px] px-1 flex items-center justify-center hover:bg-primary hover:text-white cursor-pointer rounded-sm'
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                >
                    Prev
                </div>
            )}
            {renderPaginationItems()}
            {totalPages != currentPage && (
                <div
                    className='w-fit h-[24px] px-1 flex items-center justify-center hover:bg-primary hover:text-white cursor-pointer rounded-sm'
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                >
                    Next
                </div>
            )}
        </div>
    );
}
