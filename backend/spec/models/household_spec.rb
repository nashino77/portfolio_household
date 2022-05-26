require 'rails_helper'

RSpec.describe Household, type: :model do
  describe "validates presence" do
    let(:user) { FactoryBot.create(:user) }
    context "全カラムの値を指定しているとき" do
      let(:household) { FactoryBot.create(:household, user: user) }

      it "householdのレコードが作成されるとき" do
        expect(household).to be_valid
      end
    end
    
    context "nameを指定していないとき" do
      let(:household) { FactoryBot.build(:household, name: nil, user: user) }

      it "エラーになる" do
        household.valid?
        expect(household.errors.messages[:name]).to include "can't be blank"
      end
    end

    context "amount_plannedを指定していないとき" do
      let(:household) { FactoryBot.build(:household, amount_planned: nil, user: user) }

      it "エラーになる" do
        household.valid?
        expect(household.errors.messages[:amount_planned]).to include "can't be blank"
      end
    end

  end
end
