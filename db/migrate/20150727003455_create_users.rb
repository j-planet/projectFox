class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, index: true
      t.string :name

      t.timestamps null: false
    end
  end
end
