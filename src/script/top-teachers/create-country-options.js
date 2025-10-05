import usersValidated from "../../data/users-validated.json" with { type: "json" };

const countriesList = new Set(usersValidated.users.map(u => u.country));

export const populateCountryOptions = () => {
    const options = Array.from(countriesList).map(c => `<option value="${c}">${c}</option>`);
    const container = document.querySelector("#filter-country");
    if (!container || !options) return false;
    container.innerHTML = container.innerHTML + options.join('');

    return true;
}
