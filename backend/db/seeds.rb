# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create(:name => 'test', :email => 'test@example.com', :password => 'testpassword', :password_confirmation => 'testpassword')
  Household.create(
    :user_id => 1,
    :name => "test名_1",
    :amount_planned => 10000
  )
  3.times do |n|
  Spending.create(
    :household_id => 1,
    :used_at => "Sun May 01 2022 00:00:00 GMT+0900 (日本標準時)",
    :amount_used => 500,
    :memo => "testtext_#{n}",
  )
end
