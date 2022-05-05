class CreateSpendings < ActiveRecord::Migration[6.0]
  def change
    create_table :spendings do |t|
      t.references :household, null: false, foreign_key: true
      t.date :used_at, null: false
      t.integer :amount_used, null: false
      t.text :memo

      t.timestamps
    end
  end
end
