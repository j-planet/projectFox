class Item < ActiveRecord::Base
  belongs_to :owner, class_name: "User", foreign_key: "owner_id"
  belongs_to :renter, class_name: "User", foreign_key: "renter_id"
  belongs_to :brand

  validates :owner_id, presence: true
end
