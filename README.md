Steps to set up the project locally: 

# database setup: 
at root folder of project run the following command: 
docker-compose up -d 

# front end setup:
move to frontend folder and run the following command
npm start 

# backend end setup: 
for seeding admin, firt run the following command
npm run seed:admin
it creates a admin with follwing credentials:
phone No : 9999999999
password : admin123

move to backend folder and run the following command 
nodemon index.js

user login : 
http://localhost:3000/login

user signup : 
http://localhost:3000/singup

Once user login he can search for the movie (exmaple : king)
he can see the results displayed on cards
he can select an one card, to see the full details regarding that movie
he can logout of the webiste

admin login: 
http://localhost:3000/admin/login
after login he can see the whole stats of the movies

Backend Engineering and Clean code: 
Authenication using jwt for all the routes
Database : mongodb
Models : 
  users
  movies (basic details)
  movieDetails(complete details regaring movie)
  admin 
movies, moive details docs are invalidated after 24 hrs

code flow : 
routes->controllers->usecases->repository->database interactions
usecase : business logic
