require 'rails_helper'

RSpec.describe "Api::V1::Auth::Registrations", type: :request do
  describe "POST /api/v1/auth" do
    subject { post(api_v1_user_registration_path, params: params) }
    context "値が正しく入力されているとき" do
      let(:params) { attributes_for(:user) }
      it "ユーザー登録できる" do
        subject
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("success")
        expect(res["data"]["id"]).to eq(User.last.id)
        expect(res["data"]["email"]).to eq(User.last.email)
        expect(response).to have_http_status(200)
      end
    end

    context "password_confirmationの値がpasswordと異なるとき" do
      let(:params) { attributes_for(:user, password_confirmation: "") }
      it "ユーザー登録ができない" do
        subject
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("error")
        expect(res["errors"]["full_messages"]).to include("Password confirmation doesn't match Password")
        expect(response).to have_http_status(422)
      end
    end
  end

  describe "POST /api/v1/auth/sign_in" do
    subject { post(api_v1_user_session_path, params: params) }
    context "メールアドレス、パスワードが正しいとき" do
      let(:current_user) { create(:user) }
      let(:params) { { email: current_user.email, password: current_user.password } }
      it "ログインできる" do
        subject
        expect(response.headers["uid"]).to be_present
        expect(response.headers["access-token"]).to be_present
        expect(response.headers["client"]).to be_present
        expect(response).to have_http_status(200)
      end
    end

    context "メールアドレスが正しくないとき" do
      let(:current_user) { create(:user) }
      let(:params) { { email: "test@example.com", password: current_user.password } }
      it "ログインができない" do
        subject
        res = JSON.parse(response.body)
        expect(res["success"]).to be_falsey
        expect(res["errors"]).to include("Invalid login credentials. Please try again.")
        expect(response.headers["uid"]).to be_blank
        expect(response.headers["access-token"]).to be_blank
        expect(response.headers["client"]).to be_blank
        expect(response).to have_http_status(401)
      end
    end

    context "パスワードが正しくないとき" do
      let(:current_user) { create(:user) }
      let(:params) { { email: current_user.email, password: "password" } }
      it "ログインできない" do
        subject
        res = JSON.parse(response.body)
        expect(res["success"]).to be_falsey
        expect(res["errors"]).to include("Invalid login credentials. Please try again.")
        expect(response.headers["uid"]).to be_blank
        expect(response.headers["access-token"]).to be_blank
        expect(response.headers["client"]).to be_blank
        expect(response).to have_http_status(401)
      end
    end
  end

  describe "DELETE /api/v1/auth/sign_out" do
    subject { delete(destroy_api_v1_user_session_path, headers: headers) }
    context "ユーザーがログインしているとき" do
      let(:current_user) { create(:user) }
      let(:headers) { current_user.create_new_auth_token }
      fit "ログアウトできる" do
        subject
        res = JSON.parse(response.body)
        expect(res["success"]).to be_truthy
        expect(current_user.reload.tokens).to be_blank
        expect(response).to have_http_status(200)
      end
    end
  end
  
end
