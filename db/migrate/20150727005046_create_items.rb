class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.integer :owner_id
      t.integer :renter_id
      t.references :brand, index: true
      t.string :name, index: true
      t.text :description
      t.string :image
      t.decimal :price, precision: 16, scale: 2, null: false, default: 0, index: true

      t.timestamps null: false
    end
    add_index :items, :owner_id
    add_index :items, :renter_id
  end
end
