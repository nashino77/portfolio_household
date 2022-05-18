class CreateHouseholds < ActiveRecord::Migration[6.0]
  def change
    create_table :households do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name, null: false
      t.integer :amount_planned, null: false

      t.timestamps
    end
  end
end
