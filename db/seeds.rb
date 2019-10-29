# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Comment.delete_all
User.delete_all
Place.delete_all



test_user = User.create(username: 'test', bio: 'user bio', image: 'user image')
test_user_2 = User.create(username: 'test 2', bio: 'user bio', image: 'user image')
    
# seed data with a list of atlanta neighborhoods to choose from
test_place = Place.create(name: 'test  place', location: 'test location', image: 'img src')
test_place_2 = Place.create(name: 'test  place 2', location: 'test location 2', image: 'img src')

test_comment = Comment.create(likes: 0, content: 'test comment', user_id: User.last.id, place_id: Place.last.id)
test_comment_2 = Comment.create(likes: 0, content: 'test comment numero 2', user_id: User.last.id, place_id: Place.last.id)
