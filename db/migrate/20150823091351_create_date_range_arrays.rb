class CreateDateRangeArrays < ActiveRecord::Migration
  def change
    create_table :date_range_arrays do |t|
      t.string :ranges
      t.references :item, index: true, foreign_key: true
    end
  end
end
