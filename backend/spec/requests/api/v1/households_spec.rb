require 'rails_helper'

RSpec.describe "Api::V1::Households", type: :request do
  def sign_in(user)
    post api_v1_user_session_path, params: { email: user.email, password: user.password }
    response.headers.slice('client', 'uid', 'access-token')
  end

  let(:user) { FactoryBot.create(:user) }
  let(:household) { FactoryBot.create(:household, user: user) }
  let(:token) { sign_in(user) }

  describe "GET /index" do
    subject { get(api_v1_user_households_path(user.id), headers: token) }
    context "値が正しく入力されているとき" do
      it "家計簿一覧取得できる" do
        subject
        expect(response.status).to eq 200
      end
    end
  end

  describe "GET /api/v1/users/:user_id/households/total" do
    subject { get(api_v1_user_households_total_path(user.id), params: params, headers: token) }
    context "値が正しく入力されているとき" do
      let(:params) { { target_date: Time.now }}
      it "合計金額取得できる" do
        subject
        expect(response.status).to eq 200
      end
    end
  end

  describe "POST /api/v1/users/:user_id/households" do
    subject { post(api_v1_user_households_path(user.id), params: params, headers: token) }
    context "値が正しく入力されているとき" do
      let(:params) { { household: FactoryBot.attributes_for(:household) } }
      it "家計簿の新規作成できる" do
        subject
        expect(response.status).to eq 200
      end
    end
  end

  describe "GET /api/v1/users/:user_id/households/:id" do
    subject { get(api_v1_user_household_path(user.id, household.id), headers: token) }
    context "値が正しく入力されているとき" do
      it "家計簿詳細の表示ができる" do
        subject
        expect(response.status).to eq 200
      end
    end
  end

  describe "PATCH /api/v1/users/:user_id/households/:id" do
    subject { patch(api_v1_user_household_path(user.id, household.id), params: params, headers: token) }
    let(:params) {{ household: FactoryBot.attributes_for(:household), name: "test",  amount_planned: 500 }}
    context "値が正しく入力されているとき" do
      it "家計簿詳細の更新ができる" do
        subject
        expect(response.status).to eq 200
      end
    end
  end

  describe "DELETE /api/v1/users/:user_id/households/:id" do
    subject { delete(api_v1_user_household_path(user.id, household.id), headers: token) }
    context "値が正しく入力されているとき" do
      it "家計簿の削除ができる" do
        subject
        expect(response.status).to eq 204
      end
    end
  end
end
