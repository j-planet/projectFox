FactoryGirl.define do

  factory :item do
    sequence(:name) { |i| "TestItemName_#{i}"}
    sequence(:condition) { |i| i%5 + 1}
    is_available true
  end

end