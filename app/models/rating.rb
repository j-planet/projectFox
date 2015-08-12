class Rating < ActiveRecord::Base
  belongs_to :by, class_name: "User", foreign_key: "by_id"
  belongs_to :to, class_name: "User", foreign_key: "to_id"

  validates_presence_of :by, :to
  validates_numericality_of :stars, :in => 1..5 # 5 being the best.

end
