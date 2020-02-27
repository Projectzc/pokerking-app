/**
 * Created by lorne on 2016/12/27.
 */import Storage from 'react-native-storage';
import {AsyncStorage} from 'react-native';

let storage = new Storage({
    // maximum capacity, default 1000
    size: 1000,

    // Use AsyncStorage for RN, or window.localStorage for web.
    // If not set, data would be lost after reload.
    storageBackend: AsyncStorage,

    // expire time, default 1 day(1000 * 3600 * 24 milliseconds).
    // can be null, which means never expire.
    defaultExpires: null,

    // cache data in the memory. default is true.
    enableCache: true,

    // if data was not found in storage or expired,
    // the corresponding sync method will be invoked and return
    // the latest data.
    sync: {
        // we'll talk about the details later.
    }
});

global.storage = storage;

export function save(key, value) {
    storage.save({
        key: key,   // Note: Do not use underscore("_") in key!
        data: value,
    });
}

export function load(key) {
    storage.load({
        key: key
    }).then(ret => {

    }).catch(err => {
        switch (err.name) {
            case 'NotFoundError':
                // TODO;
                break;
            case 'ExpiredError':
                // TODO
                break;
        }
    })

}