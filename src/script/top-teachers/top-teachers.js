import usersValidated from "../../data/users-validated.json" with { type: "json" };
import { createTopTeacherCard } from './create-top-teacher-card.js';
import { populateCountryOptions } from './create-country-options.js';
import { usersFilterUtil } from '../../data/util/filter/users-filter.util.js';
import { usersSearchUtil } from '../../data/util/filter/users-search.util.js';

const renderTenTeachers = (usersList) => {
    const container = document.querySelector(".top-teachers-list");
    if (!container) return false;
    container.innerHTML = usersList
        .slice()
        .sort(() => Math.random() - 0.5)
        .slice(0, 10)
        .map(createTopTeacherCard)
        .join("");

    return true;
};

let activeFilters = {};
let activeSearch = "";

const applyAllFilters = () => {
    let users = usersValidated.users.slice();
    users = usersFilterUtil(users, activeFilters);
    if (activeSearch.trim()) {
        users = usersSearchUtil(users, activeSearch);
    }

    return renderTenTeachers(users) && populateCountryOptions();
};

document.addEventListener("filters:changed", (e) => {
    activeFilters = e.detail || {};
    applyAllFilters();
});

document.addEventListener("search:changed", (e) => {
    activeSearch = e.detail || "";
    applyAllFilters();
});

document.addEventListener("componentsLoaded", applyAllFilters);
