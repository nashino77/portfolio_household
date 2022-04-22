class Spending < ApplicationRecord
  belongs_to :household

  validates :used_at, presence: true
  validates :amount_used, presence: true
end
