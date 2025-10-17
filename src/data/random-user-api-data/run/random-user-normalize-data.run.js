import { userNormalizeAndSave } from '../../util/user-normalize-data.util.js';
import randomUsers from './random-users.json' with { type: 'json' };

await userNormalizeAndSave(randomUsers, 'random-users-normalized.json', import.meta.url);
