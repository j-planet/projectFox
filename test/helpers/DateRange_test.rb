require 'test_helper'
require Rails.root.join('app', 'models', 'date_ranges.rb')

class DateRangeTest < ActiveSupport::TestCase
  test 'intersection between 2 ranges - has intersection' do
    r1 = Date.today..(Date.today+10)
    r2 = (Date.today+5)..(Date.today+15)

    assert_equal r2.begin..r1.end, DateRangeArray.intersect(r1, r2)
  end

  test 'intersection between 2 ranges - no intersection' do
    r1 = Date.today..(Date.today+10)
    r2 = (Date.today+15)..(Date.today+15)

    assert_equal nil, DateRangeArray.intersect(r1, r2)
  end

  test 'intersection between 2 ranges - containment' do
    r1 = Date.today..(Date.today+10)
    r2 = (Date.today-5)..(Date.today+15)

    assert_equal r1, DateRangeArray.intersect(r1, r2)
  end

  test 'remove one range from another - has intersection' do
    r1 = Date.today..(Date.today+10)
    r2 = (Date.today+5)..(Date.today+15)

    assert_equal [r1.begin..(r2.begin-1)], DateRangeArray.subtract(r1, r2)
  end

  test 'remove one range from another - no intersection' do
    r1 = Date.today..(Date.today+10)
    r2 = (Date.today+15)..(Date.today+15)

    assert_equal [r1], DateRangeArray.subtract(r1, r2)
  end

  test 'remove one range from another - big contained in small' do
    r1 = Date.today..(Date.today+10)
    r2 = (Date.today-5)..(Date.today+15)

    assert_equal [], DateRangeArray.subtract(r1, r2)
  end

  test 'remove one range from another - small contained in big' do
    r1 = (Date.today-5)..(Date.today+15)
    r2 = Date.today..(Date.today+10)

    assert_equal [r1.begin..(r2.begin-1), (r2.end+1)..r1.end], DateRangeArray.subtract(r1, r2)
  end

  test 'remove range from DateRange - no intersection' do
    obj = DateRangeArray.new
    obj.set_ranges(
        [Date.today-5..Date.today-2,
         Date.today..Date.today+10,
         Date.today+12..Date.today+20,
         Date.today+25..Date.today+100])
    obj.remove_range(Date.today-100..Date.today-20)

    assert [Date.today-5..Date.today-2,
            Date.today..Date.today+10,
            Date.today+12..Date.today+20,
            Date.today+25..Date.today+100],
           obj.get_ranges
  end

  test 'remove range from DateRange - covers all ranges' do
    obj = DateRangeArray.new
    obj.set_ranges(
        [Date.today-5..Date.today-2,
         Date.today..Date.today+10,
         Date.today+12..Date.today+20,
         Date.today+25..Date.today+100])
    obj.remove_range(Date.today-100..Date.today+120)

    assert [],
           obj.get_ranges
  end

  test 'remove range from DateRange - covers 2 ranges entirely' do
    obj = DateRangeArray.new
    obj.set_ranges(
        [Date.today-5..Date.today-2,
         Date.today..Date.today+10,
         Date.today+12..Date.today+20,
         Date.today+25..Date.today+100])
    obj.remove_range(Date.today-5..Date.today+20)

    assert [Date.today+25..Date.today+100],
           obj.get_ranges
  end

  test 'remove range from DateRange - contained in one range' do
    obj = DateRangeArray.new
    obj.set_ranges(
        [Date.today-5..Date.today-2,
         Date.today..Date.today+10,
         Date.today+12..Date.today+20,
         Date.today+25..Date.today+100])
    obj.remove_range(Date.today+1..Date.today+8)

    assert [Date.today-5..Date.today-2,
            Date.today..Date.today,
            Date.today+9..Date.today+10,
            Date.today+12..Date.today+20,
            Date.today+25..Date.today+100],
           obj.get_ranges
  end

  test 'remove range from DateRange - covers 3 partially and end point' do
    obj = DateRangeArray.new
    obj.set_ranges(
        [Date.today-5..Date.today-2,
         Date.today..Date.today+10,
         Date.today+12..Date.today+20,
         Date.today+25..Date.today+100])
    obj.remove_range(Date.today+5..Date.today+25)

    assert [Date.today-5..Date.today-2,
            Date.today..Date.today+4,
            Date.today+26..Date.today+100],
           obj.get_ranges
  end

end
