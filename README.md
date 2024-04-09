# Basic React-Rails project

This is a basic React frontend with Rails backend app which can be used for tests.

## Setup Guide

- `docker compose build`
- `docker compose up -d`
- `docker exec -it app bash`
- `bundle exec rails s -b '0.0.0.0'`
- Open another terminal and execute followings
- `docker exec -it app bash`
- `yarn build --watch`
