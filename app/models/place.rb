class Place < ApplicationRecord
    has_many :comments
    has_many :users, through: :comments

    # accepts_nested_attributes_for :comments
end
