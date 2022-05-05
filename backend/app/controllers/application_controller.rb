class ApplicationController < ActionController::Base
        include DeviseTokenAuth::Concerns::SetUserByToken

        # CSRFトークン検証をスキップ
        # Rails ApiをReact側より呼び出すためトークン検証ができないエラーを回避する
        skip_before_action :verify_authenticity_token
        helper_method :current_api_v1_user, :user_signed_in?

        private
        # 選択家計簿の情報取得
        def set_household
                p current_api_v1_user.households
                @household = current_api_v1_user.households.find(params[:household_id])
        end
        
        # 選択利用履歴の情報取得
        def set_spending
                @spending = @household.spendings.find(params[:id])
        end      
end
