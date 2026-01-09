/**
 * Sorts an array of pricing data by moving the current country to the top
 * @param {Array} data - Array of pricing items with country_name property
 * @param {Object} currentCountry - Country object with name property
 * @returns {Array} - Sorted array with current country first
 */
export function sortByCurrentCountry(data, currentCountry) {
    if (!data || !Array.isArray(data) || data.length === 0) {
        return data || [];
    }
    let sorted = [...data];
    const index = sorted.findIndex((item) => item.country_name === currentCountry?.name);

    if (index > -1) {
        const [current] = sorted.splice(index, 1);
        sorted.unshift(current);
    }

    return sorted;
}

/**
 * Filters an array of pricing data by country name based on search text
 * @param {Array} data - Array of pricing items with country_name property
 * @param {string} searchText - Search text to filter by
 * @returns {Array} - Filtered array matching the search text, or original array if no search text
 */
export function filterBySearch(data, searchText) {
    if (!searchText || !searchText.trim()) {
        return data || [];
    }

    if (!data || !Array.isArray(data) || data.length === 0) {
        return [];
    }

    const searchLower = searchText.toLowerCase().trim();
    return data.filter((item) => item?.country_name?.toLowerCase().includes(searchLower));
}
