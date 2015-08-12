class AddTransactionRefToItem < ActiveRecord::Migration
  def change
    add_reference :items, :transactions
  end
end
