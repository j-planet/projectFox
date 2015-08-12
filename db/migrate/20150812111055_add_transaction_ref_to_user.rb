class AddTransactionRefToUser < ActiveRecord::Migration
  def change
    add_reference :users, :transactions
  end
end
