class CreateContacts < ActiveRecord::Migration[5.1]
  def change
    create_table :contacts do |t|
      t.string :last, null: false
      t.string :first, null: false
      t.string :gender
      t.timestamp :birthdate, null: false
      t.belongs_to :user, foreign_key: true

      t.timestamps
    end
  end
end
