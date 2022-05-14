class Spending < ApplicationRecord
  belongs_to :household

  validates :used_at, presence: true
  validates :amount_used, presence: true

  scope :amount_month, -> (date){ where(used_at: date.in_time_zone.all_month) }

end
