import usersValidated from "../../data/users-validated.json" with { type: "json" };
import { renderFavourites } from './render-favourites.js';
import { CustomEvents } from '../events.js';

document.addEventListener(CustomEvents['components:loaded'], () => {
    renderFavourites(usersValidated.users);
});
