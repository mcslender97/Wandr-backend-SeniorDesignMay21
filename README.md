# Wandr-backend-SeniorDesignMay21

This is the backend structure of Project Wandr for Senior Design II class of Gannon University, Spring 2021 

This source code was taken from Bitbucket repo at https://bitbucket.gannon.xyz/projects/WAND/repos/wandr-backend , owned by me

Working features:
- Authentication using JWT token
  - Login
  - Create user account
- User
  - Update user info
  - Delete user
  - Get event that an user joined
- Event
  - Get event info by id
  - Create event
  - Update event
  - Get all users that join event
  - Join an event as a user
 - Place
  - Get places info
  - Search place with query search
  - Get events that happens in a place
    - By place id (with optional date of event)
 - Cities
  - Find cities with query search
  - Get all places that are in a city
 - Chat group
  - Get chat history


Requires Docker

To build and start service

docker build
docker-compose up -d

Stop service
docker-compose down


Based on https://github.com/ljlm0402/typescript-express-starter
