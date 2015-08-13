class CreateTransactions < ActiveRecord::Migration
  def change
    create_table :transactions do |t|
      t.references :fromUser, index: true, null: false
      t.references :toUser, index: true, null: false
      t.references :item, index: true, null: false, foreign_key: true
      t.datetime :fromDate, null: false
      t.datetime :toDate, null: false
      t.decimal :price, precision: 16, scale: 2, null: false, default: 0

      t.timestamps null: false
    end
  end
end
