# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
Movie.destroy_all

users = [
    {
      "name": "Patty"
    },
    {
      "name": "Sharon"
    }
  ]

  users.each do |user|
    User.create!(user)
  end

photos = [
    {
      "title": "dog graduating",
      "img_url": "https://i.redd.it/gi8mpmmojif41.jpg",
      "description": "dog graduates. how cute",
      "likes": 0,
      "user": User.all.first,
    },
    {
      "title": "catgirl",
      "img_url": "https://i.redd.it/je32sy4eeif41.jpg",
      "description": "adorable kitty and girl",
      "likes": 0,
      "user": User.all.second,
    },
    {
      "title": "sofa dog",
      "img_url": "https://external-preview.redd.it/etLEv-R5VhhVrTcbJL5GGMn76agZQ9ritueeZGr3lU4.jpg?auto=webp&s=e58d1c719db02f443e084094f577d9652f810e0d",
      "description": "dogs are so sweet. girl is layingon the dogs",
      "likes": 0,
      "user": User.all.first,
    },
    {
      "title": "selfie with cow",
      "img_url": "https://external-preview.redd.it/ys68Hg1KvoCDbnyR9Qaqg_sx0W705SRrxvAxbHelgqM.jpg?width=640&crop=smart&auto=webp&s=af690a6b7603475566819fe621b3a227e903ee22",
      "description": "guy takes selfie with cow",
      "likes": 0,
      "user": User.all.first,
    },
    {
      "title": "white dog",
      "img_url": "https://preview.redd.it/ybsj4pepjjf41.jpg?width=640&crop=smart&auto=webp&s=8c387a7d25df2cb3523ac31fff254b395e45b772",
      "description": "dog surrounded by flowers",
      "likes": 0,
      "user": User.all.second,
    }
  ]

  photos.each do |photo|
    Photo.create!(photo)
  end
