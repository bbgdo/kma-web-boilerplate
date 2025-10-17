import { getCountries } from '../../util/get-countries.js';

export const populateCountryOptions = () => {
    const container = document.querySelector("#teacher-country");
    if (!container) return;
    const options = getCountries().map(c => `<option value="${c}">${c}</option>`);
    if (!options) return;
    container.innerHTML = options.join('');
};
