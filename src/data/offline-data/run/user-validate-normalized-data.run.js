import { userValidateDataAndSave } from '../../util/user-validate-data.util.js';
import usersNormalized from './users-normalized.json' with { type: 'json' };

await userValidateDataAndSave(usersNormalized, 'users-validated.json', import.meta.url);
