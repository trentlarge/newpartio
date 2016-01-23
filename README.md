Partio website
========

#Development | port 8080
## install site on localhost... to reset server just ctrl+c and exec npm start again.

- git clone https://github.com/claytonmarinho/partionode.git
- cd partionode/src/ 
- npm install
- MONGO_URL='mongodb://partio:xxxxxxx@45.55.195.172:27017/partioapp' PORT=8080 npm start 

========

#Production
## install site on new docker host

- ssh root@...
- apt-get update && apt-get install python-pip && pip install docker-compose
- cd ~/
- git clone https://github.com/claytonmarinho/partionode.git
- cd ~/partionode
- docker-compose up -d

## update new code and restart container

- ssh root@...
- cd ~/partionode
- git pull origin master
- docker-compose up -d --force-recreate

========

#logs
- ssh root@...
- docker-compose logs -f partionode_partionode_1
