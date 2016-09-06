# coise

## Instructions:
- Download and install mongodb from https://www.mongodb.com/download-center?jmp=nav#community
- On a terminal go to C:\Program Files\MongoDB\Server\3.2\bin and start running mongod (just write "mongod", press enter and let it run in the backgroud.
- On another terminal go to the previous location and start running mongo
- Create the database used in this project:
```
             use simpleGamesDB;
             db.createCollection("userpws");
```
- (OPTIONAL) 
  If you to populate the database use the following cmd:
            ```
                db.userpws.insert({username:"nyo", password:"lol123"});
            ```
  This will find a record with the username = "nyo"
             ```
                 db.userpws.find({username:"nyo"});
             ```
  This will find a record with the username = "nyo" and password="lol123"
             ```
                 db.userpws.find({username:"nyo", password:"lol123"});
             ```
  This will do the as the previous query but only shows the username field
             ```   
                db.userpws.find({username:"nyo", password:"lol123"}, {username:1});
             ```
                
                
- Clone the project
- Open a terminal and go the directory of the project
- Type "npm install"
- Type "node app"
- Open a browser and go to localhost:3000
