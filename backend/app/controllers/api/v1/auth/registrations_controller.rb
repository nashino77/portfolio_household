class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  # アカウント作成
  private
  # 受け取る値の指定
  def sign_up_params
    params.permit(:email, :password, :password_confirmation, :name)
  end
end
