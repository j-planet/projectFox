class Transaction < ActiveRecord::Base
  belongs_to :fromUser, class_name: "User", foreign_key: "from_user_id"
  belongs_to :toUser, class_name: "User", foreign_key: "to_user_id"

  validates_presence_of :fromUser, :toUser
end
