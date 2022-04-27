class Api::V1::UsersController < ApplicationController
  # before_action :authenticate_api_v1_user!
  before_action :current_user_params, only: %i[show]

  # ユーザー取得 テスト用
  def index
    user = User.all
    render json: user
  end

  # ユーザー情報の取得
  def show
    p @user
    render json: @user
  end

  # ユーザー情報の更新
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: {
        data: @user.errors, 
        message: '更新ができませんでした' 
      }, status: 422
    end
  end

  # ユーザー情報の削除
  def destroy
    if @user.destroy
      head :no_content
    else
      render json: { 
        message: '削除ができませんでした' 
      }, status: 422
    end
  end

  private
  # ログイン済みユーザーの更新
  def current_user_params
    # @user = User.find(params[:id]) 
    @user = current_api_v1_user
  end

  # ユーザー情報で入力できる値の指定
  def user_params
    params.require(:user).permit(:name)
  end

end
