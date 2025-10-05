import usersValidated from "../../data/users-validated.json" with { type: "json" };
import { createTopTeacherCard } from './create-top-teacher-card.js';
import { populateCountryOptions } from './create-country-options.js';
import { usersFilterUtil } from '../../data/util/filter/users-filter.util.js';

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

document.addEventListener("componentsLoaded", () => {
    const tryRender = () => {
        const ok = renderTenTeachers(usersValidated.users) && populateCountryOptions();
        if (!ok) setTimeout(tryRender, 50);
    };
    tryRender();
});

const applyFilters = (filter) => {
    renderTenTeachers(usersFilterUtil(usersValidated.users, filter));
};


document.addEventListener("filters:changed", (e) => {
    applyFilters(e.detail);
});
