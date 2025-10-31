import WebDataRocks from "@webdatarocks/webdatarocks";
import "@webdatarocks/webdatarocks/webdatarocks.min.css";
import { isNull, keys } from "lodash-es";
import { countPerCountry } from "../../util/count-per-country.util.js";

let pivotInstance = null;
let usersCache = [];

export const renderWebdatarocksTable = (users) => {
    if (!users?.length) return;
    usersCache = users;

    const columns = keys(users[0]);
    pivotInstance = new WebDataRocks({
        container: "#pivot-container",
        toolbar: true,
        report: {
            dataSource: {
                data: users.map(u => {
                    const obj = {};
                    columns.forEach(col => (obj[col] = u[col]));
                    return obj;
                }),
            },
            options: {
                grid: {
                    type: "flat",
                    showHeaders: true,
                },
            },
        },
    });
};

export const changeToReportByCountry = () => {
    const byCountryButton = document.getElementById("webdatarocks-by-country-button");
    if (isNull(byCountryButton)) return;

    byCountryButton.addEventListener("click", async () => {
        if (!usersCache?.length) return;

        const stats = await countPerCountry(usersCache);
        pivotInstance.setReport({
            dataSource: {
                data: stats.map(s => ({
                    "Country": s.country,
                    "Teachers count": s.count,
                })),
            },
            options: {
                grid: {
                    type: "flat",
                    showHeaders: true,
                },
            },
        });
    });
};

export const changeToFlatTable = () => {
    const flatTableButton = document.getElementById("webdatarocks-flat-button");
    if (isNull(flatTableButton)) return;

    flatTableButton.addEventListener("click", () => {
        if (!usersCache?.length) return;

        const columns = keys(usersCache[0]);
        pivotInstance.setReport({
            dataSource: {
                data: usersCache.map(u => {
                    const obj = {};
                    columns.forEach(col => (obj[col] = u[col]));
                    return obj;
                }),
            },
            options: {
                grid: {
                    type: "flat",
                    showHeaders: true,
                },
            },
        });
    });
};
