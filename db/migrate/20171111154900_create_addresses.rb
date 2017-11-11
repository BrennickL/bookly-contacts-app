class CreateAddresses < ActiveRecord::Migration[5.1]
  def change
    create_table :addresses do |t|
      t.string :street1, null: false
      t.string :street2
      t.string :city, null: false
      t.string :state, null: false
      t.integer :zipcode, null: false
      t.string :country
      t.string :type_of, default: 'Home'
      t.belongs_to :contact, foreign_key: true

      t.timestamps
    end
  end
end
