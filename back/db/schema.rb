# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_12_12_162443) do
  create_table "activity_logs", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "recipe_id", null: false
    t.integer "mood", null: false
    t.integer "feedback", default: 1, null: false
    t.integer "weather", null: false
    t.integer "duration_min", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["recipe_id"], name: "index_activity_logs_on_recipe_id"
    t.index ["user_id"], name: "index_activity_logs_on_user_id"
  end

  create_table "recipes", force: :cascade do |t|
    t.string "title", null: false
    t.integer "category", null: false
    t.text "description", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name", default: "guest"
    t.integer "personality", default: 1, null: false
    t.integer "preference", default: 1, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "activity_logs", "recipes"
  add_foreign_key "activity_logs", "users"
end
