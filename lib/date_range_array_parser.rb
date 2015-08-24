class DateRangeArrayParser

  def self.dump(ranges_obj)  # [ d_from..d_to, ..., d_from..d_to ]
    ranges_obj ?
        JSON.dump(
            ranges_obj.map{|r| [r.begin.to_s, r.end.to_s]})
    : nil
  end

  def self.load(ranges_str)  # a JSON string
    ranges_str ?
        JSON.load(ranges_str)
            .map{ |r| Date.parse(r[0])..Date.parse(r[1]) }
    : nil
  end

end