Tennissocken for four
=====================

is a four player pong like game in [phaser.io](http://phaser.io) with [socket.io](https://github.com/socketio/socket.io) (node express backend)

Clone
=====
```bash
git clone git@github.com:dexta/tennissocken.git
```
**OR**
```bash
https://github.com/dexta/tennissocken.git
```
Install
=======
```bash
cd tennissocken
npm install
```
Config
======
```javascript
config.server = {port:9423,ip:'0.0.0.0'};
config.serverURL = 'http://192.168.23.55:9423';
```
The **serverURL** is the QR-Image String to connect the server as Player Client.
To connect from outside localhost we listen to 0.0.0.0 and port 9423.

Run local
=========
```bash
node server.js
```
Playfield http://localhost:9423/playfield/

Player http://localhost:9423/controls/

Docker
======

## Run container from the command line ##
env **SERVER_PORT** and parameter *-p* should be the same (int:ext)
env **PLAYFIELD_URL** must be a accessable URL in the same network linked to the controlls
```bash
docker run \
-e "SERVER_PORT=9423" \
-e "PAYFIELD_URL=http://10.5.42.23:9423/controls.html"  \
-p "9423:9423" \
-d dexta423/tennissocken:0.1.2
```

#### Run in swarm witn ingress controller
```yaml
version: "3"

services:
  tennis:
    image: dexta423/tennissocken:0.1.2

    ports:
      - "9423:9423"

    environment:
      - PAYFIELD_URL=https://example.com/controls.html
      - SERVER_PORT=9423"

    networks:
      - proxy

    healthcheck:
      test: "curl localhost:9423/playfield.html || exit 1"
      interval: 10s
      timeout: 5s
      retries: 3

    deploy:
      labels:
        - com.df.notify=true
        - com.df.serviceDomain=example.com
        - com.df.port=9423
        - com.df.servicePath=/
      mode: replicated
      replicas: 2
      update_config:
        parallelism: 1
        delay: 5s
      restart_policy:
        condition: on-failure

    command: ["npm", "start"]

networks:
  proxy:
    external: true
```
