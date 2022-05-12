class Spending < ApplicationRecord
  belongs_to :household

  validates :used_at, presence: true
  validates :amount_used, presence: true

  scope :total_amount_month, -> { where(used_at: Date.today.in_time_zone.all_month).sum(:amount_used) }
end
