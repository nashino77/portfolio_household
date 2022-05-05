// サインアップ
export interface SignUpParams {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

//サインイン
export interface SignInParams {
  email: string;
  password: string;
};

//ユーザー
export interface User {
  id: number;
  uid: string;
  provider: string;
  email: string;
  name: string;
  nickname?: string;
  image?: string;
  allowPasswordChange: boolean;
  created_at: Date;
  updated_au: Date;
};

// 家計簿
export interface Household {
  name: string;
  referenceAt: number;
  // userId: number | undefined ;
};

export interface Spending {
  memo: string;
  amount: number;
  householdId: number;
  amoutAt: Date;
}