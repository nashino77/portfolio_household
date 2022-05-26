FactoryBot.define do
  factory :household do
    name { "test" }
    amount_planned { 10000 }
    association :user, factory: :user
  end
end
