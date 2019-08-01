//const mongoose = require('mongoose');
const express = require('express');
var request = require('request'); // "Request" library
var cors = require('cors'); 
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var SpotifyWebApi = require('spotify-web-api-node');
var bodyParser = require('body-parser');
var axios=require('axios');
const logger = require('morgan');
const app = express();
app.use(cors());
var path = require('path');
const router = express.Router();
require('dotenv').config(); 


app.set('port', process.env.PORT || 8888);
var client_id = process.env.CLIENT_ID; // Your client id
var client_secret = process.env.CLIENT_SECRET; // Your secret
var redirect_uri = process.env.REDIRECT_URI; // Your redirect uri

var spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret,
  redirectUri: redirect_uri
});
//comment

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cookieParser());
app.use('/', router);



router.use(express.static(path.join(__dirname, '../client/build')))

router.get('*', (req, res) => {  
  res.sendFile(path.join(__dirname+'/client/public/index.html'));
})


var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';
router.get('/login', function(req, res) {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);
  var scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize' +
  '?response_type=code' +
  '&client_id=' + process.env.CLIENT_ID +
  (scope ? '&scope=' + encodeURIComponent(scope) : '') +
  '&redirect_uri=' + encodeURIComponent(process.env.REDIRECT_URI)+'&show_dialog=true'+'&state='+state);
});

router.get('/callback', function(req, res) {
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;
  if (state  === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
      },
      json: true
    };
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
            refresh_token = body.refresh_token;
            spotifyApi.setAccessToken(access_token);
        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };
        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
        });
        // we can also pass the token to the browser to make requests from there
        res.redirect('http://localhost:3000#' +
          querystring.stringify({
            access_token: true
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

router.post("/search",(req,res)=>{
  return spotifyApi.searchTracks(req.body.stringToSearch)
  .then(function(data) {
      console.log('I got ' + data.body.tracks.total + ' results!');
      var firstPage = data.body.tracks.items;
//      console.log(firstPage[0])
      res.send({results:firstPage})
  })
  .catch(function(err) {
      console.log('Something went wrong:', err.message);
  });
})




 const keySet={
   0:'C',
   1:'C#/D♭',
   2:'D',
   3:'D#/E♭',
   4:'E',
   5:'F',
   6:'F#/G♭',
   7:'G',
   8:'G#/A♭',
   9:'A',
   10:'A#/B♭',
   11:'B'
 }
router.post("/advanced",(req,res)=>{
  return spotifyApi.getAudioAnalysisForTrack(req.body.trackId)
  .then(function(data) {
      var tempo = data.body.track.tempo;
      var key = data.body.track.key;
      res.send({tempo:Math.round(tempo),key:keySet[key]})
  })
  .catch(function(err) {
      console.log('Something went wrong:', err.message);
  });
})

// launch our backend into a port
app.listen(process.env.PORT || 8888, () => console.log(`LISTENING ON PORT `+process.env.PORT || 8888 ));