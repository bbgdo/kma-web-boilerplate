import usersValidated from "../../data/users-validated.json" with { type: "json" };
import { isNull } from 'lodash-es';

const createTeacherInfoModal = (user) => {
    const pic = !isNull(user?.picture_large)
        ? `<img src="${user.picture_large}" alt="teacher-photo-modal" class="teacher-photo-modal">`
        : `<div class="teacher-photo-modal">no photo</div>`
    const email = !isNull(user.email)
        ? `<a href="mailto: ${user.email}">${user.email}</a>`
        : `<span>no email</span>`;
    const favouriteButton = user.favorite
        ? `<button class="standard-button" id="mark-favourite" type="button">Unmark favourite</button>`
        : `<button class="standard-button" id="mark-favourite" type="button">Mark favourite</button>`

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
`
}

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

        // need a proper way to access "db"(json file) and update the user
        const favBtn = modal.querySelector('#mark-favourite');
        if (favBtn) {
            favBtn.addEventListener('click', () => {
                user.favorite = !user.favorite;
                renderModal();
            });
        }
    };

    renderModal();
});
