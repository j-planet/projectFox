class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.references :owner, index: true, null: false
      t.references :renter, index: true
      t.references :brand, index: true, null: false, foreign_key: true
      t.string :name, index: true
      t.text :description
      t.string :thumbnailImg
      t.decimal :price, precision: 16, scale: 2, null: false, default: 0, index: true
      t.integer :condition

      t.timestamps null: false
    end
  end
end
