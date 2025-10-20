import db from '/server/db.json' with { type: 'json' };

export const getCountries = () => {
    return Array.from(new Set(db.users.map(u => u.country)));
};
