class ApplicationController < ActionController::Base
        include DeviseTokenAuth::Concerns::SetUserByToken

        helper_method :current_api_v1_user, :user_signed_in?
end
