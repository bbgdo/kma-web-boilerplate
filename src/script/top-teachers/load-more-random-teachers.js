import { CustomEvents } from '../events.js';
import { addNUsers } from '../../data/random-user-api-data/util/add-n-users.util.js';

document.addEventListener(CustomEvents['components:loaded'], async () => {
    const button = document.querySelector('.load-some-random-teachers');
    button.addEventListener('click', async () => {
        await addNUsers(10, 'src/data/users-validated.json');
    });
});
