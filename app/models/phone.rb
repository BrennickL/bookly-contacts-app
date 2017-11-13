# == Schema Information
#
# Table name: phones
#
#  id          :integer          not null, primary key
#  type_of     :string           default("Home"), not null
#  country     :integer          default(1), not null
#  prefix      :integer          not null
#  areacode    :integer          not null
#  number      :integer          not null
#  contacts_id :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Phone < ApplicationRecord
  belongs_to :contact

  validates :type_of, inclusion: { in: ['Home','Work','Other'] }
  validates :country, numericality: { greater_than: 0, less_than: 100 }
  validates :prefix, numericality: { greater_than: 100, less_than: 1000 }
  validates :areacode, numericality: { greater_than: 100, less_than: 1000 }
  validates :number, numericality: { greater_than: 1000, less_than: 10000 }
end
