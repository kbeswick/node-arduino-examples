/*
 * button_jabber.js
 * sends a message to a jabber user when a button (on pin 8) is pressed on an arduino
 */

// include libraries for jabber communication, and arduino communication
var five = require('johnny-five'),
  board, button;
var xmpp = require('node-xmpp');

var recv_jabber_user = 'receiving_user@jabber.com'; // the user to send jabber msgs to
var send_jabber_user = 'sending_user@jabber.com'; // the user that sends msgs
var send_jabber_passwd = 'somepassword'; // the sending users password
var a_message = 'Look behind you!'; // the message to send when button is pressed

board = new five.Board();

board.on('ready', function() {
  // set up jabber client
  var cl = new xmpp.Client({ jid: send_jabber_user,  password: send_jabber_passwd });

  // define button
  button = new five.Button(8);
  board.repl.inject({
    button: button
  });

  // log a message to the console when we're connected to jabber
  cl.addListener('online', function(data) {
    console.log('connected to jabber...');
  });

  // when the button is pressed
  button.on('down', function() {
    // create and send the message
    var stanza = new xmpp.Element('message',
        { to: recv_jabber_user, type: 'chat' }
    ).c('body').t(a_message);

    cl.send(stanza);
  });

});
