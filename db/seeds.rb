# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# require 'factory_girl_rails'


# create some users
u1 = FactoryGirl.create(:user)
u2 = FactoryGirl.create(:user)
u3 = FactoryGirl.create(:user)
u4 = FactoryGirl.create(:user)
u5 = FactoryGirl.create(:user)

# create some brands
b1 = FactoryGirl.create(:brand)
b2 = FactoryGirl.create(:brand)
b3 = FactoryGirl.create(:brand)

# create some items
item1 = FactoryGirl.create(:item, brand: b1, owner: u1)
item2 = FactoryGirl.create(:item, brand: b1, owner: u2)
item3 = FactoryGirl.create(:item, brand: b1, owner: u3)
item4 = FactoryGirl.create(:item, brand: b2, owner: u4)
item5 = FactoryGirl.create(:item, brand: b3, owner: u5)

item6 = FactoryGirl.create(:item, brand: b2, owner: u5)
item7 = FactoryGirl.create(:item, brand: b3, owner: u5)
item8 = FactoryGirl.create(:item, brand: b1, owner: u3)
item9 = FactoryGirl.create(:item, brand: b2, owner: u4)
item10 = FactoryGirl.create(:item, brand: b3, owner: u5)

item11 = FactoryGirl.create(:item, brand: b3, owner: u2)
item12 = FactoryGirl.create(:item, brand: b3, owner: u2)
item13 = FactoryGirl.create(:item, brand: b3, owner: u4)
item14 = FactoryGirl.create(:item, brand: b1, owner: u4)
item15 = FactoryGirl.create(:item, brand: b1, owner: u4)

# create available dates for items
dateRangeArray1 = FactoryGirl.create(:date_range_array, item: item1)
dateRangeArray2 = FactoryGirl.create(:date_range_array, item: item2)
dateRangeArray3 = FactoryGirl.create(:date_range_array, item: item3)
