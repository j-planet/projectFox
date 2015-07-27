class CreateBrands < ActiveRecord::Migration
  def change
    create_table :brands do |t|
      t.string :name, index: true
      t.text :description
      t.string :country, index: true
      t.string :image

      t.timestamps null: false
    end
  end
end
