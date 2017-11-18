# == Schema Information
#
# Table name: contacts
#
#  id         :integer          not null, primary key
#  last       :string           not null
#  first      :string           not null
#  gender     :string
#  birthdate  :datetime         not null
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

# Contact Model Representation
class Contact < ApplicationRecord
  # All Contacts belong to one and only one User Model
  belongs_to :user

  # Checks for the presence of certain strings
  validates_presence_of :last, :first, :birthdate
  # validator for gender specific types
  validates :gender, inclusion: { in: ['Male', 'Female', 'Other'] }

  # connects and allows the creation and the submition of Address Models
  has_many :addresses, dependent: :destroy
  validates_associated :addresses, allow_blank: true
  accepts_nested_attributes_for :addresses, allow_destroy: true

  # connects and allows the creation and the submition of Phone Models
  has_many :phones, dependent: :destroy
  validates_associated :phones, allow_blank: true
  accepts_nested_attributes_for :addresses, allow_destroy: true

  # connects and allows the creation and the submition of Email Models
  has_many :emails, dependent: :destroy
  validates_associated :emails, allow_blank: true
  accepts_nested_attributes_for :emails, allow_destroy: true
end
