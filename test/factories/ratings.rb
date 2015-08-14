FactoryGirl.define do

  factory :rating do
    sequence(:stars) { |i| i%5 + 1}
  end

end
