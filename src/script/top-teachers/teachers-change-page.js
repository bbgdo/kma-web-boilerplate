import { goToTeachersPage } from "./go-to-teachers-page.js";

export const teachersChangePage = (section, state) => {
    section.addEventListener("click", (e) => {
        const btn = e.target.closest(".pager-btn");
        if (!btn) return;
        state.currentPage = goToTeachersPage(
            Number(btn.dataset.page),
            state.currentPage,
            state.TEACHERS_AMOUNT,
            state.getUsers
        );
    });
};
