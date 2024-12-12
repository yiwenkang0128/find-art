export const SERVER = {
    AUTH_MISSING: 'auth-missing',
    AUTH_NOTFOUND: 'auth-notfound',
    AUTH_CONFLICT: 'auth-conflict',
    ITEM_MISSING: 'item-missing',
    AUTH_INSUFFICIENT: 'auth-insufficient',
    REQUIRED_USERNAME: 'required-username',
    ARTWORK_NOTFOUND: 'artwork-notfound',

};

export const CLIENT = {
    NETWORK_ERROR: 'network-error',
    NO_SESSION: 'noSession',
};

export const MESSAGES = {
    [CLIENT.NETWORK_ERROR]: 'Trouble connecting to the network.  Please try again.',
    [SERVER.AUTH_MISSING]: 'Please login to continue.',
    [SERVER.AUTH_INSUFFICIENT]: 'Your username is not allowed, please try another username.',
    [SERVER.REQUIRED_USERNAME]: 'Please enter a valid (letters and/or numbers) username.',
    [SERVER.AUTH_NOTFOUND]: 'Username not found. Please try another username.',
    [SERVER.AUTH_CONFLICT]: 'Username already exists.  Please try another username.',
    [SERVER.ITEM_MISSING]: 'Please fill out all fields.',
    [SERVER.ARTWORK_NOTFOUND]: 'Artwork not found.',
    default: 'Something went wrong.  Please try again.',
};

