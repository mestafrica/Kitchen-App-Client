class CreateMeals < ActiveRecord::Migration[5.0]
  def change
    create_table :meals do |t|
      t.string :name
      t.text :description
      t.string :picture_path
      t.timestamps
    end
  end
end
