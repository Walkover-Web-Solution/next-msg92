import botTemplateFilters from '@/data/botTemplateFilters.json';
import style from '../ChatBotDemoComp.module.scss';

const LABELS = botTemplateFilters.labels;
const PAGINATION = botTemplateFilters.config.pagination;

function getVisiblePages(currentPage, totalPages) {
    if (totalPages <= PAGINATION.maxVisibleWithoutEllipsis) {
        return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= PAGINATION.edgePageCount) {
        return [1, 2, 3, PAGINATION.ellipsis, totalPages];
    }

    if (currentPage >= totalPages - PAGINATION.nearEndOffset) {
        return [1, PAGINATION.ellipsis, totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, PAGINATION.ellipsis, currentPage - 1, currentPage, currentPage + 1, PAGINATION.ellipsis, totalPages];
}

export default function ChatBotDemoPagination({ currentPage, totalPages, onPageChange }) {
    const canGoPrev = currentPage > 1;
    const canGoNext = currentPage < totalPages;
    const visiblePages = getVisiblePages(currentPage, totalPages);

    return (
        <div className={style.pagination}>
            <p className={style.paginationInfo}>
                {LABELS.pageOf} <span className='font-semibold text-primary'>{currentPage}</span> {LABELS.of}{' '}
                <span className='font-semibold text-primary'>{totalPages}</span>
            </p>

            <div className={style.paginationControls}>
                <button
                    type='button'
                    className={`${style.paginationBtn} ${style.paginationBtnPrev}`}
                    disabled={!canGoPrev}
                    onClick={() => onPageChange(currentPage - 1)}
                    aria-label={LABELS.previous}
                >
                    {LABELS.previous}
                </button>

                {visiblePages.map((page, index) => {
                    if (page === PAGINATION.ellipsis) {
                        return (
                            <span key={`${PAGINATION.ellipsis}-${index}`} className={style.paginationEllipsis}>
                                {PAGINATION.ellipsisChar}
                            </span>
                        );
                    }

                    const isActive = page === currentPage;

                    return (
                        <button
                            key={page}
                            type='button'
                            className={`${style.paginationPage} ${isActive ? style.paginationPageActive : ''}`}
                            onClick={() => onPageChange(page)}
                            aria-label={`${LABELS.pageOf} ${page}`}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            {page}
                        </button>
                    );
                })}

                <button
                    type='button'
                    className={`${style.paginationBtn} ${style.paginationBtnNext}`}
                    disabled={!canGoNext}
                    onClick={() => onPageChange(currentPage + 1)}
                    aria-label={LABELS.next}
                >
                    {LABELS.next}
                </button>
            </div>
        </div>
    );
}
