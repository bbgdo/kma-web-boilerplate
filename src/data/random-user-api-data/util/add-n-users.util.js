import fs from "fs";
import path from "path";
import { fetchRandomUsers } from "./fetch-users.util.js";
import { userNormalizeDataUtil } from "../../util/user-normalize-data.util.js";
import { userValidateDataUtil } from "../../util/user-validate-data.util.js";

export const addNUsers = async (usersAmount = 10, fileLocation) => {
    const filePath = path.isAbsolute(fileLocation)
        ? fileLocation
        : path.resolve(process.cwd(), fileLocation);

    const existing = fs.existsSync(filePath)
        ? JSON.parse(fs.readFileSync(filePath, "utf-8"))
        : { changedIds: [], users: [] };

    const newUsers = userValidateDataUtil(userNormalizeDataUtil((await fetchRandomUsers(usersAmount)).results));

    const result = {
        changedIds: [...(existing.changedIds || []), ...(newUsers.changedIds || [])],
        users: [...(existing.users || []), ...(newUsers.users || [])],
    };

    fs.writeFileSync(filePath, JSON.stringify(result, null, 2), "utf-8");
};
