class Api::V1::HouseholdsController < ApplicationController
  # before_action :authenticate_user!
  before_action :current_user_params
  before_action :set_household, only: %i[show update destroy]

  # 家計簿の一覧表示
  def index
    households = user.households
    render json: { 
      households: households 
    }, status: :ok
  end

  # 家計簿の新規登録
  def create
    households = @user.households.new(household_params)
    if household.save
      render json: { 
        households: households 
      }, status: :ok
    else
      render json: { 
        data: households.errors, 
        message: '登録が正常に完了できませんでした', 
      }, status: 422
    end
  end

  # 家計簿の詳細表示
  def show
    render json: { 
      household: @household
    }, status: :ok
  end

  # 家計簿の内容更新
  def update
    if @household.update(household_params)
      render json: {
        household: @household
      }
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
  # ログイン済みユーザーの情報取得
  def current_user_params
    @user = current_api_v1_user
  end

  # def user_params
  #   @user = User.find(params[:user_id])
  # end

  # 選択した家計簿の情報取得
  def set_household
    @household = @user.household.find(params[:id])
  end

  # 家計簿情報の指定
  def household_params
    params.require(:household).permit(:name, :reference_at)
  end

end
