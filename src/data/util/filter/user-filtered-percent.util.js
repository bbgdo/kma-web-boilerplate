export const userFilteredPercentUtil = (users, filterValue, filterFunc) => {
    const initialLength = users.length;
    const filtered = filterFunc(users, filterValue);
    return {users: filtered, filteredPercent: filtered.length / initialLength * 100}
};
