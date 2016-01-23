Partio website
========

#Development | port 8080
## install site on localhost... to reset server just ctrl+c and exec npm start again.

- git clone https://github.com/trentlarge/newpartio.git
- cd newpartio/src/ 
- npm install
- MONGO_URL='mongodb://zpartio2016#@45.55.195.172:27017/partioapp' PORT=8080 npm start 

========

#Production
## install site on new docker host

- ssh root@[ip]
- apt-get update && apt-get install python-pip && pip install docker-compose
- cd ~/
- git clone https://github.com/trentlarge/newpartio.git
- cd ~/newpartio
- docker-compose up -d

## update new code and restart container

- ssh root@159.203.160.196
- cd ~/newpartio
- git pull origin master
- docker-compose up -d --force-recreate

========

#logs
- ssh root@159.203.160.196
- docker-compose logs -f newpartio_website_1
