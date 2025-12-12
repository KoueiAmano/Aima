class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string  :name,        null: true,  default: "guest"
      t.integer :personality, null: false, default: 1
      t.integer :preference,  null: false, default: 1


      t.timestamps
    end
  end
end
