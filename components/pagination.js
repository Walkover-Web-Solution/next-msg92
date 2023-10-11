import { generatePagination } from './lib/pagination'
import Link from "next/link";

function Pagination({ current, pages, link }) {
   const pagination = generatePagination(current, pages);
  return (
    <ul className='pagination-padding'>
      {pagination.map((it, i) => (
        <li key={i}>
          {it.excerpt ? (
            "..."
          ) : (
            <Link legacyBehavior href={link.href(it.page)} as={link.as(it.page)}>
              <a className={it.page === current ? "active" : null}>{it.page}</a>
            </Link>
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
        a{
          text-decoration: none;
        }
      `}</style>
    </ul>
  );
}

export default Pagination;
