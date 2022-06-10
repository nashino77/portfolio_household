class Api::V1::UsersController < ApplicationController
  # ユーザー取得 テスト用
  def index
    user = User.all
    render json: user
  end
  # ユーザー情報の取得
  def show
    render json: current_api_v1_user
  end
  # ユーザー情報の更新
  def update
    if current_api_v1_user.update(user_params)
      render json: current_api_v1_user
    else
      render json: {
        data: current_api_v1_user.errors,
        message: '更新ができませんでした'
      }, status: 422
    end
  end
  # ユーザー情報の削除
  def destroy
    if current_api_v1_user.destroy
      head :no_content
    else
      render json: {
        message: '削除ができませんでした'
      }, status: 422
    end
  end

  private
  # ユーザー情報で入力できる値の指定
  def user_params
    params.require(:user).permit(:name)
  end
end