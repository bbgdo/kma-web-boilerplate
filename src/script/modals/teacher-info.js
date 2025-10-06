import { isNull } from 'lodash-es';
import usersValidated from "../../data/users-validated.json" with { type: "json" };
import { changeFavourite } from '../../api-mock/requests/change-favourite.mock-request.js';

const createTeacherInfoModal = (user) => {
    const pic = !isNull(user?.picture_large)
        ? `<img src="${user.picture_large}" alt="teacher-photo-modal" class="teacher-photo-modal">`
        : `<div class="teacher-photo-modal">no photo</div>`;
    const email = !isNull(user.email)
        ? `<a href="mailto:${user.email}">${user.email}</a>`
        : `<span>no email</span>`;
    const favouriteButton = user.favorite
        ? `<button class="standard-button" id="mark-favourite" type="button">Unmark favourite</button>`
        : `<button class="standard-button" id="mark-favourite" type="button">Mark favourite</button>`;

    return `
    <div class="teacher-card-modal-wrapper">
        ${pic}
        <div class="teacher-info-modal-wrapper">
            <div class="teacher-name">
                ${user.full_name}
            </div>
            <p class="teacher-subject-modal">${user.course}</p>
            <p>${user.city}, ${user.country}</p>
            <p>${user?.age ?? 'no age'}, ${user.gender}</p>
            ${email}
            <p>${user?.phone ?? 'no phone'}</p>
        </div>
    </div>
    <p class="teacher-info-modal-description">${user?.note ?? ''}</p>
    <div class="teacher-info-wrapper-bottom">
        <a href="#" class="toggle-map-modal">toggle map</a>
        ${favouriteButton}
    </div>
`;
};

const openTeacherInfoModal = (user) => {
    const modal = document.getElementById('teacher-info-modal');
    if (modal) modal.style.display = 'block';
    document.dispatchEvent(new CustomEvent('teacherInfo:open', { detail: { user } }));
};

document.addEventListener('click', (e) => {
    const card = e.target.closest('.teacher-card[data-id]');
    if (!card) return;
    openTeacherInfoModal(usersValidated.users.find(u => u.id === card.dataset.id));
});

document.addEventListener('teacherInfo:open', (e) => {
    const { user } = e.detail;
    const modal = document.querySelector('.teacher-info-modal-body');
    const renderModal = () => {
        modal.innerHTML = createTeacherInfoModal(user);
        const favBtn = modal.querySelector('#mark-favourite');
        if (favBtn) {
            favBtn.addEventListener('click', async () => {
                const newValue = !user.favorite;
                try {
                    await changeFavourite(user.id, newValue);
                    user.favorite = newValue; // синхронізуємо runtime-стан
                    renderModal();
                    document.dispatchEvent(new CustomEvent('user:favouriteChanged', { detail: { id: user.id, value: newValue } }));
                } catch (e) {
                    console.error('Failed to update favourite', e);
                }
            });
        }
    };

    renderModal();
});
