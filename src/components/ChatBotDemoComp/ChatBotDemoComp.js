import { useEffect, useState } from 'react';
import Script from 'next/script';

import ChatBotDemoPagination from './ChatBotDemoPagination/ChatBotDemoPagination';
import style from './ChatBotDemoComp.module.scss';
import botTemplateFilters from '@/data/botTemplateFilters.json';
import GetMdIcons from '@/utils/getMdIcons';

const FILTER_DEFAULTS = botTemplateFilters.defaults;
const TYPE_OPTIONS = botTemplateFilters.types;
const SORT_BY_OPTIONS = botTemplateFilters.sortByOptions;
const SORT_ORDER_OPTIONS = botTemplateFilters.sortOrderOptions;
const LIMIT_OPTIONS = botTemplateFilters.limitOptions;
const CATEGORY_OPTIONS = [botTemplateFilters.allOption, ...botTemplateFilters.categories];
const FIELD_ICONS = botTemplateFilters.fieldIcons;
const LABELS = botTemplateFilters.labels;
const CONFIG = botTemplateFilters.config;
const QUERY_KEYS = CONFIG.queryKeys;
const FILTER_KEYS = CONFIG.filterKeys;
const ICON_KEYS = CONFIG.iconKeys;
const ICON_SIZES = CONFIG.iconSizes;
const WIDGET = CONFIG.widget;
const GTWY_TYPE = CONFIG.gtwyTypeValue;

function buildDemoChatbotUrl(page, filters) {
    const params = new URLSearchParams();
    params.set(QUERY_KEYS.page, String(page));

    if (filters?.search) {
        params.set(QUERY_KEYS.search, filters.search);
    }
    if (filters?.type && filters.type !== FILTER_DEFAULTS.type) {
        params.set(QUERY_KEYS.type, filters.type);
    }
    if (filters?.sortBy) {
        params.set(QUERY_KEYS.sortBy, filters.sortBy);
    }
    if (filters?.sortOrder) {
        params.set(QUERY_KEYS.sortOrder, filters.sortOrder);
    }
    if (filters?.limit) {
        params.set(QUERY_KEYS.limit, String(filters.limit));
    }
    if (filters?.category) {
        params.set(QUERY_KEYS.category, filters.category);
    }

    return `${CONFIG.basePath}?${params.toString()}`;
}

function getOptionLabel(options, value) {
    return options.find((option) => option.value === value)?.label;
}

function getTypeLabel(botType) {
    return getOptionLabel(TYPE_OPTIONS, botType);
}

function getCategoryLabel(template) {
    const categories = template?.meta?.category;
    if (Array.isArray(categories) && categories.length > 0) {
        return categories[0];
    }
}

function getAlternateSortOrder(sortOrder) {
    return SORT_ORDER_OPTIONS.find((option) => option.value !== sortOrder)?.value;
}

function FilterIcon({ name, size = ICON_SIZES.default, wrap = true }) {
    const Icon = GetMdIcons(FIELD_ICONS[name]);
    if (!Icon) {
        return null;
    }

    const iconElement = <Icon size={size} />;
    if (!wrap) {
        return iconElement;
    }

    return (
        <span className={name === ICON_KEYS.chevron ? style.compactChevron : style.fieldIcon} aria-hidden='true'>
            {iconElement}
        </span>
    );
}

export default function ChatBotDemoComp({ templateList, totalPages, currentPage, filters }) {
    const [search, setSearch] = useState(filters?.search);
    const [isDemoOpen, setIsDemoOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    const appliedFilters = filters;

    const activePills = [];
    if (appliedFilters?.search?.trim()) {
        activePills.push({
            key: FILTER_KEYS.search,
            label: `"${appliedFilters.search.trim()}"`,
        });
    }
    if (appliedFilters?.type && appliedFilters.type !== FILTER_DEFAULTS.type) {
        activePills.push({
            key: FILTER_KEYS.type,
            label: `${LABELS.pillType} ${getOptionLabel(TYPE_OPTIONS, appliedFilters.type)}`,
        });
    }
    if (appliedFilters?.category) {
        activePills.push({
            key: FILTER_KEYS.category,
            label: `${LABELS.pillCategory} ${getOptionLabel(CATEGORY_OPTIONS, appliedFilters.category)}`,
        });
    }
    if (appliedFilters?.sortBy !== FILTER_DEFAULTS.sortBy || appliedFilters?.sortOrder !== FILTER_DEFAULTS.sortOrder) {
        activePills.push({
            key: FILTER_KEYS.sort,
            label: `${LABELS.pillSort} ${getOptionLabel(SORT_BY_OPTIONS, appliedFilters.sortBy)}${
                LABELS.sortPillOpen
            }${getOptionLabel(SORT_ORDER_OPTIONS, appliedFilters.sortOrder)}${LABELS.sortPillClose}`,
        });
    }
    if (appliedFilters?.limit && appliedFilters.limit !== String(FILTER_DEFAULTS.limit)) {
        activePills.push({
            key: FILTER_KEYS.limit,
            label: `${appliedFilters.limit} ${LABELS.perPageSuffix}`,
        });
    }

    const navigateWithFilters = (nextFilters) => {
        window.location.href = buildDemoChatbotUrl(FILTER_DEFAULTS.page, nextFilters);
    };

    const applyFilterChange = (overrides) => {
        const nextFilters = {
            ...appliedFilters,
            ...overrides,
        };

        if (nextFilters.category && nextFilters.type === FILTER_DEFAULTS.type && GTWY_TYPE) {
            nextFilters.type = GTWY_TYPE;
        }

        navigateWithFilters(nextFilters);
    };

    const handleClearFilters = () => {
        window.location.href = `${CONFIG.basePath}?${QUERY_KEYS.limit}=${FILTER_DEFAULTS.limit}`;
    };

    const removeFilter = (key) => {
        const nextFilters = { ...appliedFilters };

        if (key === FILTER_KEYS.search) {
            nextFilters.search = FILTER_DEFAULTS.search;
            setSearch(FILTER_DEFAULTS.search);
        }
        if (key === FILTER_KEYS.type) {
            nextFilters.type = FILTER_DEFAULTS.type;
        }
        if (key === FILTER_KEYS.category) {
            nextFilters.category = FILTER_DEFAULTS.category;
        }
        if (key === FILTER_KEYS.sort) {
            nextFilters.sortBy = FILTER_DEFAULTS.sortBy;
            nextFilters.sortOrder = FILTER_DEFAULTS.sortOrder;
        }
        if (key === FILTER_KEYS.limit) {
            nextFilters.limit = String(FILTER_DEFAULTS.limit);
        }

        navigateWithFilters(nextFilters);
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const clearSearch = () => {
        setSearch(FILTER_DEFAULTS.search);
        applyFilterChange({ search: FILTER_DEFAULTS.search });
    };

    const handlePagination = (page) => {
        window.location.href = buildDemoChatbotUrl(page, appliedFilters);
    };

    useEffect(() => {
        setSearch(filters?.search);
    }, [filters?.search]);

    useEffect(() => {
        const trimmedSearch = search?.trim();
        const appliedSearch = appliedFilters?.search?.trim();

        if (trimmedSearch === appliedSearch) {
            return;
        }

        const timer = setTimeout(() => {
            navigateWithFilters({
                ...appliedFilters,
                search: trimmedSearch,
            });
        }, CONFIG.searchDebounceMs);

        return () => clearTimeout(timer);
    }, [search, appliedFilters]);

    const openDemo = (template) => {
        setSelectedTemplate(template);
        setIsDemoOpen(true);
    };

    const closeDemo = () => {
        setIsDemoOpen(false);
        setSelectedTemplate(null);
    };

    useEffect(() => {
        if (!isDemoOpen || !selectedTemplate?.token) {
            return;
        }

        const timer = setTimeout(() => {
            if (typeof window !== 'undefined' && window.initChatWidget) {
                window.initChatWidget(
                    {
                        widgetToken: selectedTemplate?.token,
                        hide_launcher: WIDGET.hide_launcher,
                        launch_widget: WIDGET.launch_widget,
                        show_close_button: WIDGET.show_close_button,
                        show_widget_form: WIDGET.show_widget_form,
                        hide_upload: WIDGET.hide_upload,
                        variables: {
                            bot_type: selectedTemplate?.bot_type,
                            bot_id: selectedTemplate?.bot_id,
                        },
                        parentId: CONFIG.chatParentId,
                    },
                    WIDGET.initIndex
                );
            }
        }, CONFIG.widgetInitDelayMs);

        return () => clearTimeout(timer);
    }, [isDemoOpen, selectedTemplate]);

    return (
        <>
            {selectedTemplate?.token && isDemoOpen && (
                <>
                    <Script
                        strategy='afterInteractive'
                        dangerouslySetInnerHTML={{
                            __html: `var helloConfig = {
                  widgetToken: '${selectedTemplate.token}',
                  hide_launcher: ${WIDGET.hide_launcher},
                  launch_widget: ${WIDGET.launch_widget},
                  show_close_button: ${WIDGET.show_close_button},
                  show_widget_form: ${WIDGET.show_widget_form},
                  hide_upload: ${WIDGET.hide_upload},
                  variables:{
                    bot_type: '${selectedTemplate?.bot_type}',
                    bot_id: '${selectedTemplate?.bot_id}',
                    },
                    parentId: "${CONFIG.chatParentId}"
                };`,
                        }}
                    />
                    <Script
                        onload={`initChatWidget(helloConfig, ${WIDGET.initIndex})`}
                        src={`${process.env.CHAT_WIDGET_URL}`}
                    />
                </>
            )}

            <section className='container cont_p cont cont_gap'>
                <div className='cont gap-2'>
                    <div className='flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3'>
                        <p className='text-xs sm:text-sm font-semibold text-accent'>{LABELS.heroTagline}</p>
                        <div className='inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full w-fit bg-white text-accent border border-secondary'>
                            <span className='w-2 h-2 rounded-full bg-accent'></span>
                            <span>
                                {templateList?.length > 0
                                    ? `${LABELS.showingPrefix} ${templateList.length}${
                                          totalPages
                                              ? `${LABELS.resultSeparator}${LABELS.pageOf} ${currentPage} ${LABELS.of} ${totalPages}`
                                              : ''
                                      }`
                                    : LABELS.noBots}
                            </span>
                        </div>
                    </div>
                    <h1 className='heading'>
                        {LABELS.heroTitle} <span className='text-accent'>{LABELS.heroTitleAccent}</span>
                    </h1>
                    <p className='text-sm max-w-2xl text-gray-500'>{LABELS.heroSub}</p>
                </div>

                <div className={style.filterBar}>
                    <div className={style.filterTop}>
                        <div className={style.searchWrap}>
                            <span className={style.searchIcon} aria-hidden='true'>
                                <FilterIcon name={ICON_KEYS.search} wrap={false} />
                            </span>
                            <input
                                type='search'
                                className={style.searchInput}
                                placeholder={LABELS.searchPlaceholder}
                                value={search}
                                onChange={handleSearchChange}
                            />
                            {search ? (
                                <button
                                    type='button'
                                    className={style.searchClear}
                                    onClick={clearSearch}
                                    title={LABELS.clearSearch}
                                >
                                    <FilterIcon name={ICON_KEYS.clear} wrap={false} />
                                </button>
                            ) : null}
                        </div>

                        <label className={style.compactField}>
                            <FilterIcon name={ICON_KEYS.type} />
                            <span className={style.fieldPrefix}>{LABELS.typePrefix}</span>
                            <select
                                className={style.compactSelect}
                                value={appliedFilters?.type}
                                onChange={(event) => applyFilterChange({ type: event.target.value })}
                            >
                                {TYPE_OPTIONS.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <FilterIcon name={ICON_KEYS.chevron} />
                        </label>

                        <label className={`${style.compactField} ${style.listField}`}>
                            <FilterIcon name={ICON_KEYS.category} />
                            <span className={style.fieldPrefix}>{LABELS.categoryPrefix}</span>
                            <select
                                className={style.compactSelect}
                                value={appliedFilters?.category}
                                onChange={(event) => applyFilterChange({ category: event.target.value })}
                            >
                                {CATEGORY_OPTIONS.map((option) => (
                                    <option
                                        key={
                                            option.value === FILTER_DEFAULTS.category
                                                ? CONFIG.allCategoriesKey
                                                : option.value
                                        }
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <FilterIcon name={ICON_KEYS.chevron} />
                        </label>

                        <label className={style.compactField}>
                            <FilterIcon name={ICON_KEYS.sort} />
                            <span className={style.fieldPrefix}>{LABELS.sortPrefix}</span>
                            <select
                                className={style.compactSelect}
                                value={appliedFilters?.sortBy}
                                onChange={(event) => applyFilterChange({ sortBy: event.target.value })}
                            >
                                {SORT_BY_OPTIONS.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <FilterIcon name={ICON_KEYS.chevron} />
                        </label>

                        <label className={`${style.compactField} ${style.limitField}`}>
                            <FilterIcon name={ICON_KEYS.limit} />
                            <span className={style.fieldPrefix}>{LABELS.limitPrefix}</span>
                            <select
                                className={style.compactSelect}
                                value={appliedFilters?.limit}
                                onChange={(event) => applyFilterChange({ limit: event.target.value })}
                            >
                                {LIMIT_OPTIONS.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <FilterIcon name={ICON_KEYS.chevron} />
                        </label>

                        <button
                            type='button'
                            className={style.orderToggle}
                            onClick={() =>
                                applyFilterChange({
                                    sortOrder: getAlternateSortOrder(appliedFilters?.sortOrder),
                                })
                            }
                            title={`${LABELS.orderPrefix} ${getOptionLabel(
                                SORT_ORDER_OPTIONS,
                                appliedFilters?.sortOrder
                            )}`}
                            aria-label={LABELS.orderPrefix}
                        >
                            <FilterIcon
                                name={
                                    appliedFilters?.sortOrder === FILTER_DEFAULTS.sortOrder
                                        ? ICON_KEYS.sortAsc
                                        : ICON_KEYS.sortDesc
                                }
                                size={ICON_SIZES.orderToggle}
                                wrap={false}
                            />
                        </button>
                    </div>

                    {activePills.length > 0 ? (
                        <div className='flex flex-col gap-2 border-t border-gray-100 sm:flex-row sm:items-center sm:justify-between sm:gap-3'>
                            <div className='flex flex-nowrap items-center gap-2 min-w-0 overflow-x-auto'>
                                {activePills.map((pill) => (
                                    <span
                                        key={pill.key}
                                        className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 border border-gray-300'
                                    >
                                        {pill.label}
                                        <button
                                            type='button'
                                            className='btn btn-ghost btn-xs btn-circle'
                                            onClick={() => removeFilter(pill.key)}
                                            aria-label={`${LABELS.clearAll} ${pill.key}`}
                                        >
                                            <FilterIcon
                                                name={ICON_KEYS.clear}
                                                size={ICON_SIZES.pillClear}
                                                wrap={false}
                                            />
                                        </button>
                                    </span>
                                ))}
                            </div>
                            <button
                                type='button'
                                className='btn btn-ghost btn-sm text-gray-500 self-start sm:self-auto'
                                onClick={handleClearFilters}
                            >
                                {LABELS.clearAll}
                            </button>
                        </div>
                    ) : null}
                </div>

                <div className={style.botGrid}>
                    {templateList?.length > 0 ? (
                        templateList.map((template) => (
                            <article key={template?.bot_id} className={style.botCard}>
                                <div className='cont gap-2'>
                                    <div className='flex items-center justify-between gap-2'>
                                        <span className='px-2 py-0.5 rounded text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-300'>
                                            {getTypeLabel(template?.bot_type)}
                                        </span>
                                        <span className='text-xs font-medium text-right truncate flex-1 min-w-0 text-gray-500'>
                                            {getCategoryLabel(template)}
                                        </span>
                                    </div>
                                    <h3 className='font-semibold text-sm text-primary break-words'>
                                        {template?.display_name}
                                    </h3>
                                    {template?.description ? (
                                        <p className='text-xs break-words text-gray-500 line-clamp-2'>
                                            {template.description}
                                        </p>
                                    ) : null}
                                </div>
                                <div className='cont gap-3'>
                                    <div className='border-t border-gray-200' aria-hidden='true' />
                                    <div className='flex items-center justify-between gap-2'>
                                        <span className='text-xs font-semibold text-gray-500'>
                                            {getTypeLabel(template?.bot_type)}
                                        </span>
                                        <button
                                            type='button'
                                            className='btn btn-accent btn-sm gap-1.5'
                                            onClick={() => openDemo(template)}
                                            disabled={!template?.token}
                                        >
                                            <span>{LABELS.tryDemo}</span>
                                            <FilterIcon
                                                name={ICON_KEYS.tryDemo}
                                                size={ICON_SIZES.tryDemo}
                                                wrap={false}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))
                    ) : (
                        <p className='text-gray-500 col-span-full'>{LABELS.emptyResults}</p>
                    )}
                </div>

                {totalPages > 1 && (
                    <ChatBotDemoPagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={handlePagination}
                    />
                )}
            </section>

            {isDemoOpen && selectedTemplate && (
                <div className={style.chatOverlay} role='dialog' aria-modal='true'>
                    <button
                        type='button'
                        className={style.chatBackdrop}
                        onClick={closeDemo}
                        aria-label={LABELS.closeDemoBackdrop}
                    />
                    <div className={style.chatModalBox}>
                        <div className='flex items-center justify-between gap-3 px-4 py-3 bg-gray-50 border-b border-gray-200'>
                            <div className='min-w-0'>
                                <p className='text-sm font-semibold truncate'>{selectedTemplate?.display_name}</p>
                                <p className='text-xs text-gray-500'>
                                    {getTypeLabel(selectedTemplate?.bot_type)}
                                    {LABELS.resultSeparator}
                                    {LABELS.liveDemo}
                                </p>
                            </div>
                            <button
                                type='button'
                                className='btn btn-sm btn-circle btn-ghost'
                                onClick={closeDemo}
                                aria-label={LABELS.clearSearch}
                            >
                                <FilterIcon name={ICON_KEYS.clear} wrap={false} />
                            </button>
                        </div>
                        {selectedTemplate?.token ? (
                            <div
                                className={`${style.chatbotwrapper} ${CONFIG.chatWrapperClass}`}
                                id={CONFIG.chatParentId}
                            ></div>
                        ) : (
                            <div className='flex items-center justify-center text-sm text-gray-500 p-4'>
                                {LABELS.noToken}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
