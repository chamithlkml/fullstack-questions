# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
puts 'started creating questions'

Tag.create(
  [
    {
      name: 'Ruby'
    },
    {
      name: 'Rails'
    },
    {
      name: 'React'
    },
    {
      name: 'Vue.JS'
    },
    {
      name: 'Postgres'
    },
    {
      name: 'Bootstrap'
    }
  ]
)

Question.create(
  [
    {
      title: 'How to check if a key is present in a Hash?',
      tag: Tag.find_by(name: 'Ruby')
    },
    {
      title: 'What is the difference between strings and symbol?',
      tag: Tag.find_by(name: 'Ruby')
    },
    {
      title: 'What happen if you add two same keys in Hash?',
      tag: Tag.find_by(name: 'Ruby')
    },
    {
      title: 'How to delete a given key from hash?',
      tag: Tag.find_by(name: 'Ruby')
    },
    {
      title: 'How to check if two hashes are identical?',
      tag: Tag.find_by(name: 'Ruby')
    },
    {
      title: 'How to combine two hashes in Ruby?',
      tag: Tag.find_by(name: 'Ruby')
    },
    {
      title: 'How to get unique keys from two hashes in Ruby?',
      tag: Tag.find_by(name: 'Ruby')
    },
    {
      title: 'What does the has_key?, key?, member? and include? methods in a hash?',
      tag: Tag.find_by(name: 'Ruby')
    },
    {
      title: 'What are blocks in Ruby?',
      tag: Tag.find_by(name: 'Ruby')
    },
    {
      title: 'Does the order of keys matters to compare two hashes in Ruby.?',
      tag: Tag.find_by(name: 'Ruby')
    },
    {
      title: 'What is the difference between class and functional components in React?',
      tag: Tag.find_by(name: 'React')
    },
    {
      title: 'What is the key property in React?',
      tag: Tag.find_by(name: 'React')
    },
    {
      title: 'What is render method in react class component?',
      tag: Tag.find_by(name: 'React')
    },
    {
      title: 'What are hooks in React?',
      tag: Tag.find_by(name: 'React')
    },
    {
      title: 'What is useState in React?',
      tag: Tag.find_by(name: 'React')
    },
    {
      title: 'What is createRoot method in React?',
      tag: Tag.find_by(name: 'React')
    }
  ]
)
puts 'seed is done'
