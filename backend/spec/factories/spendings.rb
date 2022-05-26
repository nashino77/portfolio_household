FactoryBot.define do
  factory :spending do
    used_at { "Sun May 01 2022 00:00:00 GMT+0900 (日本標準時)" }
    amount_used { 500 }
    memo { "test1" }
    association :household, factory: :household
  end
end
