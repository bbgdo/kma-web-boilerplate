import path from 'path';
import { fileURLToPath } from 'url';
import { writeFile } from 'fs/promises';
import { isNil, isObject } from 'lodash-es';
import { yearsPassedUtil } from './years-passed.util.js';
import { getRandomCourseUtil } from './normalize/get-random-course.util.js';
import { UserDataClass } from '../class/user-data.class.js';

const normalizeName = (user) => {
    if(!isNil(user?.name)) {
        return {
            title: user.name.title,
            full_name: user.name.first + ' ' + user.name.last,
        };
    }
    return {
        title: user?.title ?? null,
        full_name: user?.full_name ?? null,
    };
};

const normalizeLocation = (user) => {
    if(!isNil(user?.location)) {
        return {
            city: user.location.city,
            state: user.location.state,
            country: user.location.country,
            coordinates: user.location.coordinates,
            timezone: user.location.timezone,
            postcode: user.location.postcode,
        };
    }
    return {
        city: user?.city ?? null,
        state: user?.state ?? null,
        country: user?.country ?? null,
        coordinates: user?.coordinates ?? null,
        timezone: user?.timezone ?? null,
        postcode: user?.postcode ?? null,
    };
};

const normalizeBDateAndAge = (user) => {
   if(!isNil(user?.dob)) {
       return {
           b_date: new Date(user.dob.date),
           age: user.dob.age
       };
   }
   if(!isNil(user?.b_day)) {
       const bDate = new Date(user.b_day);
       return {
           b_date: bDate,
           age: yearsPassedUtil(bDate)
       };
   }
   return {b_date: null, age: null};
};

const normalizePicture = (user) => {
   if(!isNil(user?.picture)) {
       return {
           picture_large: user.picture.large,
           picture_thumbnail: user.picture.thumbnail
       };
   }
   return {
       picture_large: user?.picture_large ?? null,
       picture_thumbnail: user?.picture_thumbnail ?? null
   };
};

const normalizeId = (user) => {
    if(!isNil(user?.id) && isObject(user.id)) {
        return {
            id: user.id.name + user.id.value,
        };
    }
    return {
        id: user?.id ?? null,
    };
};

export const userNormalizeDataUtil = (data) => {
    const users = [];
    data.forEach((user) => {
        const normalized = new UserDataClass({
            gender: user.gender,
            email: user.email,
            phone: user.phone,
            ...normalizeName(user),
            ...normalizeLocation(user),
            ...normalizeBDateAndAge(user),
            ...normalizePicture(user),
            ...normalizeId(user),
            course: getRandomCourseUtil(),
            favorite: user.favorite,
            bg_color: user.bg_color,
            note: user.note,
        });
        users.push(normalized);
    });
    return users;
};

export const userNormalizeAndSave = async (data, filename = 'users.json', baseUrl = import.meta.url) => {
    const outPath = path.join(path.dirname(fileURLToPath(baseUrl)), filename);
    await writeFile(outPath, JSON.stringify(userNormalizeDataUtil(data), null, 2));
};
