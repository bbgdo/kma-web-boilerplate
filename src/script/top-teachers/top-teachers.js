import usersValidated from "../../data/users-validated.json" with { type: "json" };
import { isNull } from 'lodash-es';
import { initials } from '../util/initials.js';
import { splitName } from '../util/split-name.js';

const createTeacherCard = (user) => {
    const pic = !isNull(user.picture_large)
        ? `<div class="teacher-photo-clipper"><img class="teacher-photo-avatar" src="${user.picture_large}" alt="teacher-photo"></div>`
        : `<div class="teacher-text-avatar"><span>${initials(user.full_name)}</span></div>`;
    const star = user.favorite
        ? `<img class="teacher-star" src="src/static/images/star.svg" alt="teacher-star">`
        : `<img class="teacher-star" style="display: none;" src="src/static/images/star.svg" alt="teacher-star">`;
    const nameParsed = splitName(user.full_name);

    return `
    <div class="teacher-card" data-id="${user.id}">
      <div class="teacher-avatar-wrapper">
        ${star}
        ${pic}
      </div>
      <div class="teacher-info">
        <div class="teacher-name">
          <p>${nameParsed.firstname}</p>
          <p>${nameParsed.lastname}</p>
        </div>
        <p class="teacher-subject">${user.course}</p>
        <p class="teacher-country">${user.country}</p>
      </div>
    </div>
  `;
};

const renderTenTeachers = (usersList) => {
    const container = document.querySelector(".top-teachers-list");
    if (!container) return false;
    container.innerHTML = usersList
        .slice()
        .sort(() => Math.random() - 0.5)
        .slice(0, 10)
        .map(createTeacherCard)
        .join("");

    return true;
};

document.addEventListener("componentsLoaded", () => {
    renderTenTeachers(usersValidated.users);
})
