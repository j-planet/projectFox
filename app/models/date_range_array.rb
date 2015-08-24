require 'date'
require 'date_range_array_parser'


class DateRangeArray < ActiveRecord::Base
  belongs_to :item

  serialize :ranges, DateRangeArrayParser

  def initialize(*args)
    @ranges = [Date.today..Date::Infinity.new]
    super(*args)
  end

  # remove given range from list of ranges
  def remove_range(range_to_remove)
    @ranges = @ranges.collect { |r| self.class.subtract(r, range_to_remove)}
                  .flatten
  end

  # intersect two ranges, nil if there's no intersection
  def self.intersect(r1, r2)
    l = [r1.begin, r2.begin].max
    r = [r1.end, r2.end].min

    l<=r ? l..r : nil
  end

  # exclude small from big, there may not be intersections between the two
  # RECURSSIVE!!
  def self.subtract(big, small)

    # cases where the end points are identical
    if big.begin == small.begin   # leads to a return
      return (small.end < big.end ? [(small.end+1)..big.end] : [])
    end

    if big.end == small.end   # leads to a return
      return (small.begin > big.begin ? [big.begin..(small.begin-1)] : [])
    end

    # no matching end points
    if self.contains?(big, small)   # leads to a return
      return [big.begin..(small.begin-1), (small.end+1)..big.end]
    else
      middle = self.intersect(big, small)

      if middle
        return self.subtract(big, middle)
      else
        return [big]
      end
    end
  end

  # whether big contains small entirely
  def self.contains?(big, small)
    big.include?(small.begin) && big.include?(small.end)
  end

end

