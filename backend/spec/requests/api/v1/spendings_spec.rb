require 'rails_helper'

RSpec.describe "Api::V1::Spendings", type: :request do
  def sign_in(user)
    post api_v1_user_session_path, params: { email: user.email, password: user.password }
    response.headers.slice('client', 'uid', 'access-token')
  end

  let(:user) { FactoryBot.create(:user) }
  let(:household) { FactoryBot.create(:household, user: user) }
  let(:spending) { FactoryBot.create(:spending, household: household) }
  let(:token) { sign_in(user) }

  describe "GET /api/v1/users/:user_id/households/:household_id/spendings" do
    subject { get(api_v1_user_household_spendings_path(user.id, household.id), headers: token) }
    context "値が正しく入力されているとき" do
      it "利用履歴一覧取得できる" do
        subject
        expect(response.status).to eq 200
      end
    end
  end

  describe "GET /api/v1/users/:user_id/households/:household_id/spendings/total" do
    subject { get(api_v1_user_household_spendings_total_path(user.id, household.id), params: params, headers: token) }
    context "値が正しく入力されているとき" do
      let(:params) { { target_date: Time.now }}
      it "月別合計金額取得できる" do
        subject
        expect(response.status).to eq 200
      end
    end
  end

  describe "POST /api/v1/users/:user_id/households/:household_id/spendings" do
    subject { post(api_v1_user_household_spendings_path(user.id, household.id), params: params, headers: token) }
    context "値が正しく入力されているとき" do
      let(:params) { { spending: FactoryBot.attributes_for(:spending) } }
      it "家計簿の新規作成できる" do
        subject
        expect(response.status).to eq 200
      end
    end
  end

  describe "GET /api/v1/users/:user_id/households/:household_id/spendings/:id" do
    subject { get(api_v1_user_household_spending_path(user.id, household.id, spending.id), headers: token) }
    context "値が正しく入力されているとき" do
      it "利用履歴詳細の表示ができる" do
        subject
        expect(response.status).to eq 200
      end
    end
  end

  describe "PATCH /api/v1/users/:user_id/households/:household_id/spendings/:id" do
    subject { patch(api_v1_user_household_spending_path(user.id, household.id, spending.id), params: params, headers: token) }
    let(:params) {{ spending: FactoryBot.attributes_for(:spending), memo: "test",  amount_used: 500 }}
    context "値が正しく入力されているとき" do
      it "家計簿詳細の更新ができる" do
        subject
        expect(response.status).to eq 200
      end
    end
  end

  describe "DELETE /api/v1/users/:user_id/households/:household_id/spendings/:id" do
    subject { delete(api_v1_user_household_spending_path(user.id, household.id, spending.id), headers: token) }
    context "値が正しく入力されているとき" do
      it "家計簿の削除ができる" do
        subject
        expect(response.status).to eq 204
      end
    end
  end
end
