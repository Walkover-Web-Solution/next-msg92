import Link from "next/link";

function Pagination({ current, pages }) {
    console.log("🚀 ~ pages:", pages)
    const pagination = generatePagination(34, pages);
    console.log("🚀 ~ pagination:", pagination)
    return (
        <ul className="pagination-padding">
            {pagination.map((page, i) => {
                console.log("🚀 ~ {pagination.map ~ it:", page, current);
                return (
                    <li key={i}>
                        {page.excerpt ? (
                            "..."
                        ) : (
                            <Link href={`/guide?page=${page.page}`}>
                                <span className={i === current ? "blog_activePage" : null}>{page.page}</span>
                            </Link>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}

export default Pagination;

export function generatePagination(current, pages) {
console.log("🚀 ~ generatePagination ~ current:", current)
console.log("🚀 ~ generatePagination ~ pages:", pages)
let result = [];
if (current !== 1) {
    result.push({ page: 1 });
    if (current > 3) {
        result.push({ excerpt: true });
    }
}
for (let i = Math.max(2, current - 1); i <= Math.min(pages, current + 1); i++) {
    if (i !== current) {
        result.push({ page: i });
    }
}
if (current !== pages) {
    if (current < pages - 2) {
        result.push({ excerpt: true });
    }
    result.push({ page: pages });
}
return result;















}