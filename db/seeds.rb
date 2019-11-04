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



   
# seed data with a list of atlanta neighborhoods to choose from
downtown_atlanta = Place.create(name: 'Downtown Atlanta', image: 'img src')
midtown = Place.create(name: 'Midtown', image: 'img src')
ansley_park = Place.create(name:'Ansley Park', image:'')
atlantic_station = Place.create(name:'Atlantic Station', image:'')
tech_square = Place.create(name:'Tech Square', image:'')
home_park = Place.create(name:'Home Park', image:'')
loring_heights = Place.create(name:'Loring Heights', image:'')
sherwood_forest = Place.create(name:'Sherwood Forest', image:'')
west_midtown = Place.create(name:'West Midtown', image:'')
atkins_park = Place.create(name:'Atkisns Park', image:'')
avondale_estates = Place.create(name:'Avondale Estates', image:'')
cabbagetown = Place.create(name:'Cabbagetown', image:'')
candler_park = Place.create(name:'Candler Park', image:'')
druid_hills = Place.create(name:'Druid Hills', image:'')
decatur = Place.create(name:'Decatur', image:'')
east_atlanta = Place.create(name:'East Atlanta', image:'')
east_lake = Place.create(name:'East Lake', image:'')
edgewood = Place.create(name:'Edgewood', image:'')
kirkwood = Place.create(name:'Kirkwood', image:'')
inman_park = Place.create(name:'Inman Park', image:'')
lake_claire = Place.create(name:'Lake Claire', image:'')
lindridge = Place.create(name:'Lindridge-Martin Manor', image:'')
lenox = Place.create(name:'Morningside-Lenox Park', image:'')
oakland  = Place.create(name:'Oakland', image:'')
old_forth_ward  = Place.create(name:'Old Fourth Ward', image:'')
ormewood = Place.create(name:'Ormewood Park', image:'')
piedmont  = Place.create(name:'Piedmont Heights', image:'')
poncey  = Place.create(name:'Poncey-Highland', image:'')
reynoldstown  = Place.create(name:'Reynoldstown', image:'')
auburn  = Place.create(name:'Sweet Auburn', image:'')
scottdale  = Place.create(name:'Scottdale', image:'')
v_highland  = Place.create(name:'Virginia-Highland', image:'')


