class CreateHouseholds < ActiveRecord::Migration[6.0]
  def change
    create_table :households do |t|
      t.string :household_id, null: false
      t.references :user, null: false, foreign_key: true
      t.string :name
      t.integer :refernce_at

      t.timestamps
    end
  end
end
