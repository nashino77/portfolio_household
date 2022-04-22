class CreateSpendings < ActiveRecord::Migration[6.0]
  def change
    create_table :spendings do |t|
      t.string :spending_id
      t.references :household, null: false, foreign_key: true
      t.date :used_at
      t.integer :amount_used
      t.text :memo

      t.timestamps
    end
  end
end
