class Household < ApplicationRecord
  belongs_to :user
  has_many :spendings, dependent: :destroy

  validates :name, presence: true
  validates :reference_at, presence: true
end
