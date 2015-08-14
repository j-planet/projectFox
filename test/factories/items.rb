FactoryGirl.define do

  factory :item do
    sequence(:name) { |i| "TestItemName_#{i}"}
    sequence(:condition) { |i| i%5 + 1}
    price { 1000 + 1000 * rand}
    is_available true
  end

end