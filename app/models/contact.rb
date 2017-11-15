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

class Contact < ApplicationRecord
  belongs_to :user

  validates_presence_of :last, :first, :birthdate
  validates :gender, inclusion: { in: ['Male', 'Female'] }

  has_many :addresses, dependent: :destroy
  validates_associated :addresses, allow_blank: true
  accepts_nested_attributes_for :addresses, allow_destroy: true

  has_many :phones, dependent: :destroy
  validates_associated :phones, allow_blank: true
  accepts_nested_attributes_for :addresses, allow_destroy: true

  has_many :emails, dependent: :destroy
  validates_associated :emails, allow_blank: true
  accepts_nested_attributes_for :emails, allow_destroy: true
end
