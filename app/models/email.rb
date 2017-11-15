# == Schema Information
#
# Table name: emails
#
#  id         :integer          not null, primary key
#  type_of    :string           not null
#  address    :string           not null
#  contact_id :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Email < ApplicationRecord
  belongs_to :contact

  validates :type_of, inclusion: { in: ['Home', 'Work', 'Other'] }
  validates :address, presence: true, format: { with: Devise.email_regexp }
end
