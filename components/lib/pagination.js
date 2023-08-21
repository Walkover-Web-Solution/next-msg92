export function generatePagination(current, pages) {
  console.log( pages, "123");
  console.log( current, "9current");
  return Array.from(Array(pages).keys())
    .map((it) => it + 1)
    .filter((it) => it === 1 || it === pages || Math.abs(current - it) <= 2)
    .map((it) => ({
      page:
        Math.abs(current - it) === 2 && it !== 1 && it !== pages ? null : it,
      current: it === current,
      excerpt: Math.abs(current - it) === 2 && it !== 1 && it !== pages,
    }));
}

