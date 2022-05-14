class Api::V1::HouseholdsController < ApplicationController
  before_action :set_household, only: %i[show update destroy]

  # 家計簿の一覧表示
  def index
    households = current_api_v1_user.households.order(created_at: :asc).all
    render json: households, status: :ok
  end

  # 全家計簿の月別利用金額合計の取得
  def index_total
    all_amount_planned = current_api_v1_user.households.sum(:amount_planned)
    all_spending = current_api_v1_user.spendings.amount_month(params[:target_date])
    total = current_api_v1_user.spendings.amount_month(params[:target_date]).sum(:amount_used)
    render json: {total: total, all_spending: all_spending, all_amount_planned: all_amount_planned}
  end

  # 家計簿の新規登録
  def create
    household = current_api_v1_user.households.create(household_params)
    p current_api_v1_user
    if household.save
      render json: household, status: :ok
    else
      render json: { 
        data: household.errors, 
        message: '登録が正常に完了できませんでした', 
      }, status: 422
    end
  end

  # 家計簿の詳細表示
  def show
    render json: @household, status: :ok
  end

  # 家計簿の内容更新
  def update
    if @household.update(household_params)
      render json: @household
    else
      render json: {
        data: @households.errors,
        message: "登録が正常に完了できませんでした",
      }, status: 422
    end
  end

  # 家計簿の削除
  def destroy
    if @household.destroy
      head :no_content
    else
      render json: { 
        message: '削除が完了できませんでした' 
      }, status: 422
    end
  end


  private
  # 家計簿情報の指定
  def household_params
    params.require(:household).permit(:name, :amount_planned, :user_id)
  end

  def set_household
    @household = current_api_v1_user.households.find(params[:id])
  end
end
