class CreateActivityLogs < ActiveRecord::Migration[8.0]
  def change
    create_table :activity_logs do |t|
      t.references :user, null: false, foreign_key: true
      t.references :recipe, null: false, foreign_key: true
      t.integer :mood, null: false
      t.integer :feedback, null: false, default: 1
      t.integer :weather, null: false
      t.integer :duration_min, null: false

      t.timestamps
    end
  end
end

