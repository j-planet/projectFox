require 'date'

class DateRanges

  def initialize()
    @ranges = [Date.today..Date::Infinity.new]
  end

  def get_ranges()
    @ranges
  end

  def set_ranges(ranges)
    @ranges = ranges
  end

  # remove given range from list of ranges
  def remove_range(rangeToRemove)
    @ranges = @ranges.collect { |r| self.class.subtract(r, rangeToRemove)}
                  .flatten
  end

  # intersect two ranges, nil if there's no intersection
  def self.intersect(r1, r2)
    l = [r1.begin, r2.begin].max
    r = [r1.end, r2.end].min

    if l<=r then l..r else nil end
  end

  # exclude small from big, there may not be intersections between the two
  # RECURSSIVE!!
  def self.subtract(big, small)

    # cases where the end points are identical
    if big.begin == small.begin   # leads to a return
      return (if small.end < big.end then [(small.end+1)..big.end] else [] end)
    end

    if big.end == small.end   # leads to a return
      return (if small.begin > big.begin then [big.begin..(small.begin-1)] else [] end)
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