class CreateRatings < ActiveRecord::Migration
  def change
    create_table :ratings do |t|
      t.references :by, index: true, null: false
      t.references :to, index: true, null: false
      t.integer :stars

      t.timestamps null: false
    end
  end
end
