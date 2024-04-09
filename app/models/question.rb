class Question < ApplicationRecord
  validates :title, presence: true, uniqueness: true
  belongs_to :tag
end
