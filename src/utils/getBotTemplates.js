import axios from 'axios';

import botTemplateFilters from '@/data/botTemplateFilters.json';

const defaults = botTemplateFilters.defaults;
const apiConfig = botTemplateFilters.config.api;

export default async function getBotTemplates({
    page = defaults.page,
    limit = defaults.limit,
    search = defaults.search,
    sortBy = defaults.sortBy,
    sortOrder = defaults.sortOrder,
    type = defaults.type,
    category = defaults.category,
    tags = defaults.tags,
} = {}) {
    const filters = {
        search,
        type,
        sortBy,
        sortOrder,
        limit: String(limit),
        category,
        tags,
    };

    const params = {
        page,
        limit,
        sortBy,
        sortOrder,
        type,
    };

    if (search) {
        params.search = search;
    }

    const filterObject = {};
    if (category) {
        filterObject[apiConfig.filterCategoryKey] = category;
    }
    if (tags) {
        filterObject[apiConfig.filterTagsKey] = tags;
    }
    if (Object.keys(filterObject).length > 0) {
        params.filter = JSON.stringify(filterObject);
    }

    const response = await axios.get(`${process.env.HELLO_API_URL}/public/bot/template/`, {
        params,
    });

    if (response?.data?.success) {
        return {
            ...response.data.data,
            filters,
        };
    }

    throw new Error(apiConfig.errorMessage);
}
