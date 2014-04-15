/*
 * piezo_jabber.js
 * play some songs on arduino via requests from jabber
 */

var five = require("johnny-five"),
  board = new five.Board();
var xmpp = require("node-xmpp");

// change me
var jabber_user = 'someuser@jabber.com';
var jabber_password = 'somepassword';

// songs that can be played
var songTable = {
  'song1': {
    'notes': 'cdfda ag cdfdg gf ',
    'durations': '111111442111111442'
  },
  'mary': {
    'notes': 'edcdeee ddd egg edcdeeeeddedc ',
    'durations': '222222242224222422222222222222'
  },
  'twinkle': {
    'notes': 'ddaabba ggffeed',
    'durations': '222222442222224'
  }
}

board.on("ready", function() {
  // create a piezo object (pin 3)
  var piezo = new five.Piezo(3);
  // connect to jabber
  var cl = new xmpp.Client({ jid: jabber_user,  password: jabber_password });

  board.repl.inject({
    piezo: piezo
  });

  // when connected to jabber, log to console, set presence to online
  cl.on('online', function() {
      console.log('connected to jabber...')
      cl.send(new xmpp.Element('presence', { })
        .c('show').t('chat').up()
        .c('status').t('Send a song name')
      )
  })

  // listen for msgs, play songs
  cl.addListener('stanza', function(stanza) {
      if (stanza.is('message') && (stanza.attrs.type !== 'error')) {
        var body = stanza.getChild('body');

        if (!body) {
          return;
        }

        var songTitle = body.getText();
        // play a song if it exists
        if (songTable[songTitle]) {
          piezo.song(songTable[songTitle]['notes'], songTable[songTitle]['durations']);
        }
        else {
          return;
        }
      }
  });
});
