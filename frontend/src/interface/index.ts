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
  amountPlanned: number;
};
export interface GetHousehold {
    id: number;
    userId: number;
    name: string;
    amountPlanned: number;
    createdAt: Date;
    updatedAt: Date;
};
// 利用履歴
export interface Spending {
  memo: string;
  amountUsed: number;
  usedAt: Date | string;
}
export interface GetSpending {
  amountUsed: number;
  createdAt: Date;
  householdId: number;
  id: number;
  memo: string;
  updatedAt: Date;
  usedAt: string;
};
// 日付データ
export interface TargetDate {
  targetDate: Date;
}