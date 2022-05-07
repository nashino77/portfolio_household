class Api::V1::HouseholdsController < ApplicationController
  before_action :set_household, only: %i[show update destroy]

  # 家計簿の一覧表示
  def index
    households = current_api_v1_user.households.all
    render json: households, status: :ok
  end

  # 家計簿の新規登録
  def create
    binding.pry
    household = current_api_v1_user.households.new(household_params)
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
    # params.require(:household).permit(:name, :reference_at)
    params.permit(:name, :reference_at)
  end
end
