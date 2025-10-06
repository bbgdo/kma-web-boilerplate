import { yearsPassedUtil } from '../../data/util/helper/years-passed.util.js';

document.addEventListener("componentsLoaded", () => {
    const modal = document.getElementById("add-teacher-modal");
    const form = modal?.querySelector(".add-teacher-form");
    if (!modal || !form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = form["teacher-name"].value.trim();
        if (!name) {
            alert("Please enter teacher name");
            return;
        }

        const dob = form["teacher-dob"].value;
        const age = dob ? yearsPassedUtil(dob) : "";
        const color = form["teacher-color"]?.value || "#cccccc";

        const data = {
            full_name: name,
            course: form["teacher-speciality"].value,
            country: form["teacher-country"].value,
            city: form["teacher-city"].value,
            email: form["teacher-email"].value,
            phone: form["teacher-phone"].value,
            gender: form["teacher-sex"].value,
            note: form["teacher-notes"].value.trim(),
            color,
            age,
        };

        try {
            const resp = await fetch("/api/add-teacher", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const json = await resp.json();

            if (json.ok) {
                modal.style.display = "none";
                form.reset();
                document.dispatchEvent(new CustomEvent("teacher:added", { detail: json.user }));
                return true;
            } else {
                console.error("Add teacher error:", json.error);

                return false;
            }
        } catch (err) {
            console.error("Add teacher error:", err);
        }
    });
});
