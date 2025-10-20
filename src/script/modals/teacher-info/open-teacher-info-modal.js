import db from "/server/db.json" with { type: "json" };
import { CustomEvents } from '../../events.js';

export const openTeacherInfoModal = () => {
    const teacherCards = document.querySelectorAll(".top-teachers-list, .carousel-list");
    if (teacherCards.length === 0) return;

    teacherCards.forEach(l => l.addEventListener("click", (e) => {
        const card = e.target.closest(".teacher-card[data-id]");
        if (!card) return;

        const id = card.dataset.id;
        const modal = document.getElementById("teacher-info-modal");
        if (modal) modal.style.display = "block";

        const user = db.users.find(u => u.id === id);
        if (user) {
            document.dispatchEvent(new CustomEvent(CustomEvents['teacherInfo:open'], { detail: { user } }));
        }
    }));
};
