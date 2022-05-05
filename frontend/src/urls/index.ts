export const REACT_APP_DEFAULT_URL = 'http://localhost:3000/api/v1';

export const testUrl = `${REACT_APP_DEFAULT_URL}/test`;

export const AUTH = `${REACT_APP_DEFAULT_URL}/auth`;
export const signInUser = `${AUTH}/sessions`;

export const indexUser = `${REACT_APP_DEFAULT_URL}/users`;
export const indexUserId = (userId: number) => `${REACT_APP_DEFAULT_URL}/users/${userId}`;

export const householdIndex = (userId: number) =>  `${REACT_APP_DEFAULT_URL}/users/${userId}/households`;

// export const spendingIndex =  `${householdIndexId}/spendings`;
// export const spendingIndexId = (spendingIndexId: number) => `${spendingIndex}/${spendingIndexId}`;
