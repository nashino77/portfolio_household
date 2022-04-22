class Api::V1::SpendingsController < ApplicationController
  # before_action :authenticate_user!
  before_action :current_user_params
  before_action :set_household
  before_action :set_spending, only: %i[show update destroy]

  # 利用利敵の一覧取得
  def index
  end

  # 利用履歴の新規登録
  def create
  end

  # 利用履歴の詳細表示
  def show
  end

  # 利用履歴の情報更新
  def update
  end

  # 利用履歴の削除
  def destroy
  end

  private
  # ログイン済みユーザーの情報取得
  def current_user_params
    @user = current_api_v1_user
  end

  # 選択家計簿の情報取得
  def set_household
    @household = @user.household.find(params[:id])
  end

  # 選択利用履歴の情報取得
  def set_spending
    @spending = @household.spending.find(params[:id])
  end

  # 利用履歴の登録する値の指定
  def spending_params
    params.require(:spending).permit(:amount_used, :memo, :used_at)
  end
end
