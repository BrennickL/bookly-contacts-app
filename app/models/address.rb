# == Schema Information
#
# Table name: addresses
#
#  id         :integer          not null, primary key
#  street1    :string           not null
#  street2    :string
#  city       :string           not null
#  state      :string           not null
#  zipcode    :integer          not null
#  country    :string
#  type_of    :string           default("Home")
#  contact_id :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Address < ApplicationRecord
  belongs_to :contact

  validates_presence_of :street1, :city, :state
  validates :zipcode, presence: true, numericality: { greater_than: 0 }
  validates :type_of, presence: true, inclusion: { in: %w(Home Work Other),
    message: "%{value} is not a valid type of address"
  }
end
