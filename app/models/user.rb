class User < ApplicationRecord
    has_many :comments
    has_many :places, through: :comments


    validates :username, uniqueness: true
end
