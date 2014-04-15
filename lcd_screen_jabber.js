/*
 * lcd_screen_jabber.js
 * connect to jabber, display received messages on an arduino lcd screen
 */

var five = require('johnny-five'),
  board, lcd;
var xmpp = require('node-xmpp');

// change me
var jabber_user = 'someuser@jabber.com';
var jabber_password = 'somepassword';

board = new five.Board();

board.on("ready", function() {
  // set up xmpp client
  var cl = new xmpp.Client({ jid: jabber_user,  password: jabber_password });

  // set up arduino lcd on pins 7,8,9,10,11,12
  lcd = new five.LCD({
    pins: [7, 8, 9, 10, 11, 12],
  });

  lcd.on("ready", function() {

    // when connected, log to console, set bot presence to online
    cl.on('online', function() {
        console.log('connected to jabber...')
        cl.send(new xmpp.Element('presence', { })
          .c('show').t('chat').up()
          .c('status').t('Send me a message')
        )
    })

    // listen for messages, print the sender & body to the lcd screen
    cl.addListener('stanza', function(stanza) {
        if (stanza.is('message') && (stanza.attrs.type !== 'error')) {
          var body = stanza.getChild('body');
          if (!body) {
            return;
          }
          lcd.clear().print(stanza.attrs.from.substring(0,10) + '...'); // truncate username
          lcd.cursor(1, 0);
          lcd.print(body.getText()); // print msg on second line
        }
    });
  });

  this.repl.inject({
    lcd: lcd
  });
});
