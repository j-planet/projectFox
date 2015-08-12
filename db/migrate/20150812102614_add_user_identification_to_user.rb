class AddUserIdentificationToUser < ActiveRecord::Migration
  def change
    add_reference :users, :user_identification
  end
end
