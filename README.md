Tennissocken for four
=====================

is a four player pong clone in [phaser.io](http://phaser.io) with [socket.io](https://github.com/socketio/socket.io) (node express backend)

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


Run
===
```bash
node server.js
```
Playfield http://localhost:9423/puck.html

Player http://localhost:9423/
