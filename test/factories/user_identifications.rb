FactoryGirl.define do
  factory :user_identification do

    sequence(:code) { |i| "code_#{i}"}

    type "Driver's License"

    # association :user
  end

end
