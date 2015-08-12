class Item < ActiveRecord::Base
  belongs_to :owner, class_name: "User", foreign_key: "owner_id"
  belongs_to :renter, class_name: "User", foreign_key: "renter_id"
  belongs_to :brand

  has_many :transactions, dependent: :destroy

  # validates :owner_id, presence: true
  validates_presence_of :owner, :brand
  validates_numericality_of :condition, :in => 1..5 # condition of the purse, 5 being the best.

  # TODO:
  #   - available dates instead of is_available
end
