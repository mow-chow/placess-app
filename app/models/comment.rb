class Comment < ApplicationRecord
  belongs_to :user, required: true
  belongs_to :place, required: true

  # validates_presence_of :user
  # validates_presence_of :place

  # accepts_nested_attributes_for :user
end
