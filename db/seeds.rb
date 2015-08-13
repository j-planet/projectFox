# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require('factory_girl_rails')
FactoryGirl.define do
  factory :user do
    sequence(:name) { |i| "TestName_#{i}"}
    sequence(:username) { |i| "TestUserName_#{i}"}
    sequence(:email) { |i| "TestEmail_#{i}@bagwhim.com"}
    sequence(:password) { |i| "TestPassword_#{i}"}
  end

  factory :brand do
    sequence(:name) { |i| "TestBrandName_#{i}"}
  end

  factory :item do
    sequence(:name) { |i| "TestItemName_#{i}"}
  end
end