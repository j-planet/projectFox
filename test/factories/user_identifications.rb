FactoryGirl.define do
  factory :user_identification do

    sequence(:name) { |i| "license_#{i}"}
    sequence(:code) { |i| "code_#{i}"}

    type "Driver's License"
  end

end
