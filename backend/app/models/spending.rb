class Spending < ApplicationRecord
  belongs_to :household
  validates :used_at, presence: true
  validates :amount_used, presence: true, numericality: {greater_than_or_equal_to: 0}
  scope :amount_month, -> (date){ where(used_at: date.in_time_zone.all_month) }
end
