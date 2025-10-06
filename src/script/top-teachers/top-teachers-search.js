export const initTopTeachersSearch = () => {
    const form = document.querySelector(".search-bar");
    const input = document.getElementById("search-input");
    if (!form || !input) return false;

    const emitSearch = (query) => {
        document.dispatchEvent(new CustomEvent("search:changed", { detail: query }));
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        emitSearch(input.value.trim());
    });

    input.addEventListener("input", (e) => {
        if (e.target.value === "") emitSearch("");
    });

    return true;
};

document.addEventListener("componentsLoaded", initTopTeachersSearch);

