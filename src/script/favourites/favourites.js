import usersValidated from "../../data/users-validated.json" with { type: "json" };
import { isNull } from 'lodash-es';
import { initials } from '../util/initials.js';
import { splitName } from '../util/split-name.js';

const createTeacherCard = (user) => {
    const pic = !isNull(user?.picture_thumbnail)
        ? `<div class="teacher-photo-clipper"><img class="teacher-photo-avatar" src="${user.picture_thumbnail}" alt="teacher-photo"></div>`
        : `<div class="teacher-text-avatar"><span>${initials(user.full_name)}</span></div>`;
    const nameParsed = splitName(user.full_name);

    return `
    <div class="teacher-card" data-id="${user.id}">
      <div class="teacher-avatar-wrapper">
        ${pic}
      </div>
      <div class="teacher-info">
        <div class="teacher-name">
          <p>${nameParsed.firstname}</p>
          <p>${nameParsed.lastname}</p>
        </div>
        <p class="teacher-country">${user.country}</p>
      </div>
    </div>
  `;
};

const renderFavourites = (usersList) => {
    const container = document.querySelector(".pseudo-carousel-list");
    if (!container) return;
    const favourites = usersList.filter((u) => u.favorite === true);
    container.innerHTML = favourites.map(createTeacherCard).join("");

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
