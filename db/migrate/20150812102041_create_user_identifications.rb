class CreateUserIdentifications < ActiveRecord::Migration
  def change
    create_table :user_identifications do |t|
      t.string :type
      t.string :code
      t.string :imgpath
      t.belongs_to :user, index: true, foreign_key: true, null: false

      t.timestamps null: false
    end
  end
end
