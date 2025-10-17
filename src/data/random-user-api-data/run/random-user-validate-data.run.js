import { userValidateDataAndSave } from '../../util/user-validate-data.util.js';
import usersNormalized from './random-users-normalized.json' with { type: 'json' };

await userValidateDataAndSave(usersNormalized, 'random-users-validated.json', import.meta.url);
