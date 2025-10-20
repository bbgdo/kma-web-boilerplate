import db from "/server/db.json" with { type: "json" };
import { renderTable } from './render-table.js';
import { renderTablePager } from './render-table-pager.js';
import { tableChangeSort } from './table-change-sort.js';
import { tableChangePage } from './table-change-page.js';
import { CustomEvents } from '../events.js';
import { usersFilterUtil } from '../../data/util/filter/users-filter.util.js';
import { usersSearchUtil } from '../../data/util/filter/users-search.util.js';

const TABLE_ROWS_AMOUNT = 10;
let currentPage = 1;
let sort = { sortBy: null, order: null };
let activeFilters = {};
let activeSearch = '';

const getUsers = () => {
    let users = db.users.slice();
    users = usersFilterUtil(users, activeFilters);
    return activeSearch.trim() ? usersSearchUtil(users, activeSearch) : users;
};

const state = {
    getUsers,
    sort,
    currentPage,
    TABLE_ROWS_AMOUNT,
};

const render = (section) => {
    renderTable(state);
    renderTablePager(getUsers().length, TABLE_ROWS_AMOUNT, currentPage);
    tableChangePage(section, state);
    tableChangeSort(section, state);
};

document.addEventListener(CustomEvents['components:loaded'], () => {
    const section = document.querySelector(".statistics");
    if (!section) return;
    currentPage = 1;
    render(section);
});

document.addEventListener(CustomEvents['filters:changed'], (e) => {
    const section = document.querySelector(".statistics");
    if (!section) return;
    activeFilters = e.detail || {};
    render(section);
});

document.addEventListener(CustomEvents['search:changed'], (e) => {
    const section = document.querySelector(".statistics");
    if (!section) return;
    activeSearch = e.detail || '';
    render(section);
});
