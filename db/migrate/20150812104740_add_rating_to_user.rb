class AddRatingToUser < ActiveRecord::Migration
  def change
    add_reference :users, :ratings
  end
end
