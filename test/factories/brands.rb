FactoryGirl.define do

  factory :brand do
    sequence(:name) { |i| "TestBrandName_#{i}"}
  end

end