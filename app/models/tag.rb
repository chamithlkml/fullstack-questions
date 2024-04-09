class Tag < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  has_many :questions
end