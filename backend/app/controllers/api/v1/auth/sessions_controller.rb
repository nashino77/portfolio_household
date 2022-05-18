class Api::V1::Auth::SessionsController < ApplicationController
  # ログイン状態の確認
  def index
    p current_api_v1_user
    if current_api_v1_user
      render json: { is_login: true, data: current_api_v1_user }
    else
      render json: { is_login: false, message: "ユーザーが存在しません" }
    end
  end
end
