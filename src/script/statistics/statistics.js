import usersValidated from "../../data/users-validated.json" with { type: "json" };
import { usersSortUtil } from '../../data/util/filter/users-sort.util.js';

const PAGE_SIZE = 10;
let currentPage = 1;
let sortState = { sortBy: null, order: null };

const users = usersValidated.users || [];

const createRow = (u) => `
  <tr data-id="${u.id}">
    <td>${u.full_name ?? ""}</td>
    <td>${u.course ?? ""}</td>
    <td>${u.age ?? ""}</td>
    <td>${u.gender ?? ""}</td>
    <td>${u.country ?? ""}</td>
  </tr>
`;

const renderTable = (root) => {
    const tbody = root.querySelector("tbody");
    if (!tbody) return;

    let displayUsers = [...users];
    displayUsers = usersSortUtil(displayUsers, sortState);

    const start = (currentPage - 1) * PAGE_SIZE;
    const pageUsers = displayUsers.slice(start, start + PAGE_SIZE);

    tbody.innerHTML = pageUsers.map(createRow).join("");
};

const renderPager = (root) => {
    const total = Math.max(1, Math.ceil(users.length / PAGE_SIZE));
    let pager = root.querySelector(".statistics-pagination");
    if (!pager) {
        pager = document.createElement("div");
        pager.className = "statistics-pagination";
        root.appendChild(pager);
    }

    const makeButton = (page, label = String(page)) =>
        `<button type="button" class="pager-btn${currentPage === page ? " is-active" : ""}" data-page="${page}">${label}</button>`;

    if (total === 1) {
        pager.innerHTML = makeButton(1);
        return;
    }

    const pages = Array.from({ length: total - 1 }, (_, i) => i + 1)
        .map(p => makeButton(p))
        .join("");

    pager.innerHTML = pages + makeButton(total, "last");
};

const goToPage = (page, root) => {
    const total = Math.max(1, Math.ceil(users.length / PAGE_SIZE));
    currentPage = Math.min(Math.max(1, page), total);
    renderTable(root);
    renderPager(root);
};

const toggleSort = () => {
    if (sortState.sortBy !== "full_name") {
        sortState = { sortBy: "full_name", order: "asc" };
    } else if (sortState.order === "asc") {
        sortState = { sortBy: "full_name", order: "desc" };
    } else {
        sortState = { sortBy: null, order: null };
    }
};

document.addEventListener("click", (e) => {
    const btn = e.target.closest(".statistics .pager-btn");
    const section = document.querySelector(".statistics");

    if (btn && section) {
        goToPage(parseInt(btn.dataset.page, 10), section);
        return;
    }

    if (e.target.matches(".statistics th[data-sort='full_name']")) {
        toggleSort();
        if (section) renderTable(section);
    }
});

document.addEventListener("componentsLoaded", () => {
    const section = document.querySelector(".statistics");
    if (!section) return;
    currentPage = 1;
    renderTable(section);
    renderPager(section);
});
