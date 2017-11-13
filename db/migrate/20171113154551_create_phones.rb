class CreatePhones < ActiveRecord::Migration[5.1]
  def change
    create_table :phones do |t|
      t.string :type_of, null: false, default: 'Home'
      t.integer :country, null: false, default: 1
      t.integer :prefix, null: false
      t.integer :areacode, null: false
      t.integer :number, null: false
      t.belongs_to :contact, foreign_key: true

      t.timestamps
    end
  end
end
