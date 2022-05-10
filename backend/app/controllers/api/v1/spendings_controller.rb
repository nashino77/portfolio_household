class Api::V1::SpendingsController < ApplicationController
  # before_action :authenticate_user!
  before_action :set_household_index, only: %i[index]
  before_action :set_household, only: %i[show update destroy]
  before_action :set_spending, only: %i[show update destroy]

  # 利用履歴の一覧取得
  def index
    spendings = @household.spendings.all
    render json: spendings
  end

  # 利用履歴の新規登録
  def create
    spending = @household.spendings.new(spending_params)
    if spending.save
      render json: spending, status: :ok
    else
      render json: { 
        data: spending.errors, 
        message: '登録が正常に完了できませんでした', 
      }, status: 422
    end
  end

  # 利用履歴の詳細表示
  def show
    render json: @spending
  end

  # 利用履歴の情報更新
  def update
    if @spending.update(spending_params)
      render json: @spending, status: :ok
    else
      render json: { 
        data: spending.errors, 
        message: '登録が正常に完了できませんでした', 
      }, status: 422
    end
  end

  # 利用履歴の削除
  def destroy
    if @spending.destroy
      head :no_content
    else
      render json: { 
        message: '削除が完了できませんでした' 
      }, status: 422
    end
  end

  private
  # 利用履歴の登録する値の指定
  def spending_params
    params.require(:spending).permit(:amount_used, :memo, :used_at)
  end

  def set_household_index
    @household = current_api_v1_user.households.find(params[:household_id])
  end

  def set_household
    @household = current_api_v1_user.households.find(params[:household_id])
  end

  def set_spending
    @spending = @household.spendings.find(params[:id])
  end
end
