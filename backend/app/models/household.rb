class Household < ApplicationRecord
  belongs_to :user
  has_many :spendings, dependent: :destroy

  validates :name, presence: true
  validates :amount_planned, presence: true
end
