const DEFAULT_URL = "http://localhost:3000/api/v1";
export const testUrl = `${DEFAULT_URL}/test`;
export const AUTH = `${DEFAULT_URL}/auth`;
export const signInUser = `${AUTH}/sessions`;
export const indexUser = `${DEFAULT_URL}/users`;
export const indexUserId = (userId: number) => `${DEFAULT_URL}/users/${userId}`;
export const householdIndex = (userId: number) =>  `${DEFAULT_URL}/users/${userId}/households`;