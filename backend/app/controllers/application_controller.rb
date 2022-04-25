class ApplicationController < ActionController::Base
        include DeviseTokenAuth::Concerns::SetUserByToken

        # CSRFトークン検証をスキップ
        # Rails ApiをReact側より呼び出すためトークン検証ができないエラーを回避する
        skip_before_action :verify_authenticity_token
        helper_method :current_api_v1_user, :user_signed_in?
end
