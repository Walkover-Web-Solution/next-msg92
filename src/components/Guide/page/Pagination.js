import { generatePagination } from '../lib/pagination';

function Pagination({ current, pages }) {
    const pagination = generatePagination(current, pages);
    return (
        <ul className='flex justify-center'>
            {pagination.map((it, i) => (
                <li key={i}>
                    {it.excerpt ? (
                        '...'
                    ) : (
                        <a href={it.page == current ? null : it.page === 1 ? '/guide' : '/guide?page=' + it.page}>
                            <span className={it.page == current ? 'text-white bg-accent px-2 py-1 rounded' : null}>
                                {it.page}
                            </span>
                        </a>
                    )}
                </li>
            ))}
            <style jsx>{`
                ul {
                    list-style: none;
                    margin: 3rem 0 0 0;
                    padding: 0;
                }
                li {
                    display: inline-block;
                    margin-right: 1em;
                    color: #9b9b9b;
                    font-size: 1.25rem;
                }
                a.active {
                    color: #222;
                    font-weight: bold;
                }
                a {
                    text-decoration: none;
                }
            `}</style>
        </ul>
    );
}

export default Pagination;
