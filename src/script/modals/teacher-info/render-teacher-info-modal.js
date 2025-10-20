import { createTeacherInfoModal } from './create-teacher-info-modal.js';

const changeFavourite = async (id, value) => {
    const resp = await fetch("/api/change-favourite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, value }),
    });
    if (!resp.ok) throw new Error(await resp.text());

    return resp.json();
};

export const renderTeacherInfoModal = (user) => {
    const modal = document.querySelector('.teacher-info-modal-body');
    modal.innerHTML = createTeacherInfoModal(user);
    const favBtn = modal.querySelector('#mark-favourite');
    if (favBtn) {
        favBtn.addEventListener('click', async () => {
            const newValue = !user.favorite;

            try{
                await changeFavourite(user.id, newValue);
                user.favorite = newValue;
                renderTeacherInfoModal(user);
            } catch(err) {
                console.error(err);
            }
        });
    }
};
