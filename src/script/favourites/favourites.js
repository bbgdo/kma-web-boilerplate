import usersValidated from "../../data/users-validated.json" with { type: "json" };
import { createFavouriteTeacherCard } from './create-favorite-teacher-card.js';

const renderFavourites = (usersList) => {
    const container = document.querySelector(".pseudo-carousel-list");
    if (!container) return;
    const favourites = usersList.filter((u) => u.favorite === true);
    container.innerHTML = favourites.map(createFavouriteTeacherCard).join("");

    initCarousel(container);
};

const initCarousel = (container) => {
    const prevBtn = document.querySelector(".carousel-button-prev");
    const nextBtn = document.querySelector(".carousel-button-next");

    if (!prevBtn || !nextBtn) return;

    const scrollAmount = container.firstElementChild?.offsetWidth || 250;

    prevBtn.addEventListener("click", () => {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    nextBtn.addEventListener("click", () => {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
};

document.addEventListener("componentsLoaded", () => {
    renderFavourites(usersValidated.users);
});
