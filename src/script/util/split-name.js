export const splitName = (str) => {
    const parts = str.trim().split(/\s+/);
    return {
        firstname: parts[0] || "",
        lastname: parts[1] || ""
    };
};
