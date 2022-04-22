class Household < ApplicationRecord
  belongs_to :user
  has_many :spendingsm, dependent: :destroy

  validates :name, presence: true
  validates :refernce_at, presence :true
end
