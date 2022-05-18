export const DEFAULT_URL = process.env.REACT_APP_DEFAULT_URL;

export const testUrl = `${DEFAULT_URL}/test`;

export const AUTH = `${DEFAULT_URL}/auth`;
export const signInUser = `${AUTH}/sessions`;

export const indexUser = `${DEFAULT_URL}/users`;
export const indexUserId = (userId: number) => `${DEFAULT_URL}/users/${userId}`;

export const householdIndex = (userId: number) =>  `${DEFAULT_URL}/users/${userId}/households`;

