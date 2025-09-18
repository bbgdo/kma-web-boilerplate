import path from 'path';
import { fileURLToPath } from 'url';
import usersValidated from './users-validated.json' with { type: 'json' };
import { usersFilterUtil } from '../util/filter/users-filter.util.js';
import { usersSortUtil } from '../util/filter/users-sort.util.js';
import { userSearchUtil } from '../util/filter/user-search.util.js';
import { userFilteredPercentUtil } from '../util/filter/user-filtered-percent.util.js';
import { writeFile } from 'fs/promises';

const demos = []

const usersFiltered = usersFilterUtil(
    usersValidated.users,
    {
        genders: ['Female'],
        favorites: [true, false],
        ageRange: { max: 30 }
    }
);
demos.push(usersFiltered);

const usersSorted = usersSortUtil(usersValidated.users, { sortBy: 'age', order: 'asc' });
demos.push(usersSorted);

const usersSearched = userSearchUtil(usersValidated.users, 'Svi');
demos.push(usersSearched);

const searchWithPercent = userFilteredPercentUtil(usersValidated.users, 66, userSearchUtil);
demos.push(searchWithPercent);

for (let i = 0; i < demos.length; i++) {
    const outPath = path.join(path.dirname(fileURLToPath(import.meta.url)), `demos/${i+1}-demo.json`)
    await writeFile(outPath, JSON.stringify(demos[i], null, 2))
}
