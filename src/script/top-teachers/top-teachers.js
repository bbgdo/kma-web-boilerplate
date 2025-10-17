import usersValidated from "../../data/users-validated.json" with { type: "json" };
import { populateCountryOptions } from "./populate-country-options.js";
import { usersFilterUtil } from "../../data/util/filter/users-filter.util.js";
import { usersSearchUtil } from "../../data/util/filter/users-search.util.js";
import { teachersChangePage } from "./teachers-change-page.js";
import { goToTeachersPage } from "./go-to-teachers-page.js";
import { CustomEvents } from '../events.js';

const TEACHERS_AMOUNT = 10;
let activeFilters = {};
let activeSearch = '';

const getUsers = () => {
    let users = usersValidated.users.slice();
    users = usersFilterUtil(users, activeFilters);
    return activeSearch.trim() ? usersSearchUtil(users, activeSearch) : users;
};

const state = { currentPage: 1, TEACHERS_AMOUNT, getUsers };

const render = () => {
    state.currentPage = goToTeachersPage(1, state.currentPage, TEACHERS_AMOUNT, getUsers);
    populateCountryOptions();
};

document.addEventListener(CustomEvents['components:loaded'], () => {
    const section = document.querySelector('.top-teachers');
    if (!section) return;
    render();
    teachersChangePage(section, state);
});

document.addEventListener(CustomEvents['filters:changed'], (e) => {
    activeFilters = e.detail || {};
    render();
});

document.addEventListener(CustomEvents['search:changed'], (e) => {
    activeSearch = e.detail || '';
    render();
});
