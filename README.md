# node-arduino-examples - node.js based arduino examples

## Description

Some example scripts written in JS that interface with an arduino using the
'johnny-five' node.js library. Most of these also interface with jabber in some
way. These scripts were the product of an hour's worth of experimenting with
using JS to program Arduinos.

## Installation

You need to have node.js and npm installed

You also need to install the 'node-xmpp' and 'johnny-five' libraries via npm:

```bash
npm install node-xmpp
npm install johnny-five
```

There are also some config values to change (mainly jabber uid/password) within
the scripts.

When you are ready to run, just run as a normal node.js script:

```bash
node script_name.js
```
