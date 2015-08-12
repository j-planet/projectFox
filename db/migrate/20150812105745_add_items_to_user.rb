class AddItemsToUser < ActiveRecord::Migration
  def change
    add_reference :users, :items
  end
end
