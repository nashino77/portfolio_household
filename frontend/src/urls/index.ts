export const REACT_APP_DEFAULT_URL = 'http://localhost:3000/api/v1';

export const testUrl = `${REACT_APP_DEFAULT_URL}/test`;

export const AUTH = `${REACT_APP_DEFAULT_URL}/auth`;
export const signInUser = `${AUTH}/sessions`;

export const indexUser = `${REACT_APP_DEFAULT_URL}/users`;
// export const indexUserId = (userId) => `${REACT_APP_DEFAULT_URL}/users/${userId}`;

// export const householdIndex = (userId) =>  `${REACT_APP_DEFAULT_URL}/users/${userId}/households`;
// export const householdIndexId = (userId, householdId) => `${REACT_APP_DEFAULT_URL}/users/${userId}/households/${householdId}`;

// export const spendingIndex = (userId, householdId) => `${REACT_APP_DEFAULT_URL}/users/${userId}/households/${householdId}/spendings`;
// export const spendingIndexId = (userId, householdId, spendingIndexId) => `${REACT_APP_DEFAULT_URL}/users/${userId}/households/${householdId}/spendings/${spendingIndexId}`;