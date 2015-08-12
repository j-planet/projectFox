class AddImgfnamesToItem < ActiveRecord::Migration
  def change
    add_column :items, :images, :text, array: true, default: []
  end
end
