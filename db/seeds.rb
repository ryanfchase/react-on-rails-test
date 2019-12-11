# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

course = Course.create(title: "Hello World", description: "Create new react app")
section = Section.create(title: "Chapter 1", description: "The beginning.", course: course)
episode = Episode.create([
  { title: 'Florida Man Takes All', description: 'lorem', url: "www.google.com", section: section, course: course },
  { title: 'Rabid Dog Saves Grandmother', description: 'ipsum',  url: "www.google.com", section: section, course: course},
  { title: 'Kentucky Railroad Missing, Wabbit At Large', description: 'there goes',  url: "www.google.com", section: section, course: course},
  { title: 'React Tutorial', description: 'Rick\'s Son',  url: "www.google.com", section: section, course: course},
])