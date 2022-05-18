FactoryBot.define do
  factory :user do
    name { Faker::Name.name }
    email { |n| "#{n}_" + Faker::Internet.email }
    password { "testpassword" }
  end
end
