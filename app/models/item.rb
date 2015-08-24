class Item < ActiveRecord::Base
  belongs_to :owner, class_name: "User", foreign_key: "owner_id"
  belongs_to :renter, class_name: "User", foreign_key: "renter_id"
  belongs_to :brand

  has_one :date_range_array
  has_many :transactions, dependent: :destroy

  # ---- validations ----
  validates :owner_id, presence: true
  validates_presence_of :owner, :brand
  validates_numericality_of :condition, :in => 1..5 # condition of the purse, 5 being the best.
  before_create :owner_and_renter_must_be_different

  def owner_and_renter_must_be_different
    if self.owner == self.renter
      msg = 'Owner and renter cannot be the same.'
      errors.add(:owner, msg)
      errors.add(:renter, msg)
    end
  end
end
