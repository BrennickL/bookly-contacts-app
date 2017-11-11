class Address < ApplicationRecord
  belongs_to :contact

  validates_presence_of :street1, :street2, :city, :state, :country
  validates :zipcode, presence: true, numericality: { greater_than: 0 }
  validates :type_of, presence: true, inclusion: { in: %w(Home Work Other),
    message: "%{value} is not a valid type of address"
  }
end
