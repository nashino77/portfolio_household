class UsersController < ApplicationController
  before_action :current_user_params

  # ユーザー情報の取得
  def show
    render json: {
      user: @user
    }
  end

  # ユーザー情報の更新
  def update
    if @user.update(user_params)
      render json: { 
        user: @user 
      }
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
      head: no_content
    else
      render json: { 
        message: '削除ができませんでした' 
      }, status: 422
    end
  end

  private
  # ログイン済みユーザーの更新
  def current_user_params
    @user = current_api_v1_user
  end

  # ユーザー情報で入力できる値の指定
  def user_params
    params.require(:user).permit(:name)
  end

end
