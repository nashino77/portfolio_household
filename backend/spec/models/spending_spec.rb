require 'rails_helper'

RSpec.describe Spending, type: :model do
  let(:user) { FactoryBot.create(:user) }
  let(:household) { FactoryBot.create(:household, user: user) }

  context "全カラムの値を指定しているとき" do
    let(:spending) { FactoryBot.create(:spending, household: household) }

    it "spendingのレコードが作成されるとき" do
      expect(spending).to be_valid
    end
  end

  context "used_atを指定していないとき" do
    let(:spending) { FactoryBot.build(:spending, used_at: nil, household: household) }

    it "エラーになる" do
      spending.valid?
      expect(spending.errors.messages[:used_at]).to include "can't be blank"
    end
  end

  context "amount_usedを指定していないとき" do
    let(:spending) { FactoryBot.build(:spending, amount_used: nil, household: household) }

    it "エラーになる" do
      spending.valid?
      expect(spending.errors.messages[:amount_used]).to include "can't be blank"
    end
  end

end
