FactoryGirl.define do
  daysTillStart = rand(30)  # rental start date is 0~30 days from now on

  factory :transaction do
    fromDate { Date.today + daysTillStart }
    toDate { Date.today + daysTillStart + rand(10) +1 }  # rental duration of 1~10 days
    price {1000 + rand * 1000}  # price is a random number in [1000, 2000]
  end

end