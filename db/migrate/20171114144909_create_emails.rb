class CreateEmails < ActiveRecord::Migration[5.1]
  def change
    create_table :emails do |t|
      t.string :type_of, null: false, default: 'Other'
      t.string :address, null: false
      t.belongs_to :contact, foreign_key: true

      t.timestamps
    end
  end
end
