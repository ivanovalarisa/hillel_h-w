'use strict';

function localStorageGet(key) {
    let info = localStorage.getItem(key);
    try {
       info = JSON.parse(info);
    } catch (e) {
        return null;
    }
    return info;
}

function localStorageSet(key, item) {
    localStorage.setItem(key, JSON.stringify(item));
}

