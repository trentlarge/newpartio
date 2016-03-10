////////////////////////////////////////////////////////////////////////////////
 /// Partio WebSite 2016
 ////////////////////////////////////////////////////////////////////////////////

var express = require('express');
var app = express();
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient;
var mongoUrl = process.env.MONGO_URL;
var server_port = process.env.PORT;

if(mongoUrl){
	MongoClient.connect(mongoUrl, function(err, db) {
	  if(err){
	  	console.log(err);
	  } else {
	  	console.log("Mongodb connected"); 

		Users = db.collection('users');
	  }
	});
} else {
	console.log("no MONGO_URL");
}

////////////////////////////////////////////////////////////////////////////////
 /// App 
 ////////////////////////////////////////////////////////////////////////////////

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded({    // to support URL-encoded bodies
  extended: true
})); 

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file
app.use('/', express.static(__dirname + '/public'));

// index page 
app.get('/', function(req, res) {
	res.render('pages/index', { title: 'partiO | the social marketplace to monetize your personal inventory', tryValidate: false });
});

// team
app.get('/team', function(req, res) {
	res.render('pages/team', { title: 'partiO | meet the team', tryValidate: false });
});

//contact
app.get('/contact/', function(req, res) {
	res.render('pages/contact', { title: 'partiO | contact us' });
});

app.post('/submitcontact', function(req, res){
	var smtpConfig = {
    	host: 'smtp.zoho.com',
	    port: 465,
	    secure: true, // use SSL
	    auth: {
	        user: 'support@partioapp.com',
	        pass: 'partio123'
	    }
	};

	//console.log(req);

	var transporter = nodemailer.createTransport(smtpConfig, {
	    from: 'Partio Support <support@partioapp.com>'
	});

	// setup e-mail data with unicode symbols
	var mailOptions = {
	    from: 'Partioapp.com <support@partioapp.com>', // sender address
	    to: 'support@partioapp.com', // list of receivers
	    subject: 'Partioapp.com | Contact > New submit form ✔', // Subject line
	    html: 	'<p>Hi guys, there is a new message from contact form :)</p><br>' +
	       		'<ul><li><b>From:</b> '+req.body.name+'</li><li><b>Email:</b> '+req.body.email+'</li><li><b>Message:</b> '+req.body.message+'</li></ul>' +
	       		'<br><a href="http://partiodemo.com">PartiO</a>'
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
		//Email not sent
		if (error) {
			var response = '0';
		}
		//Yay!! Email sent
		else {
			var response = '1';
		}

		res.end(response);
	});
});

//faq
app.get('/faq/', function(req, res) {
	res.render('pages/faq', { title: 'partiO | faq' });
});

//validate email
app.get('/verify-email/:token', function(req, res) {
	//res.end('Displaying information for token ' + req.params.token);
	if(!req.params.token){
		res.writeHead(301, { Location: '/?invalid' });
	}

	var token = req.params.token;

	Users.findOne({ "services.email.verificationTokens.token": token }, function(err, user){
		if (err) {
			console.log(err);
		}

		if(user){
			console.log('New user verification >>>> '+user._id);
			Users.update({"_id": user._id }, { $set: { 	"services.email.verificationTokens": [], 
														"emails.0.verified": true }
			}, function(error) {
				if(error){
					console.log('User verification failed', token, error);
					res.render('pages/index', { title: 'partiO | the social marketplace to monetize your personal inventory', tryValidate: true, _user: false });
				} else {
					console.log('User verification successful', token, error);
					res.render('pages/index', { title: 'partiO | the social marketplace to monetize your personal inventory', tryValidate: true, _user: user.profile.name });
				}
			});
		} else {
			res.render('pages/index', { title: 'partiO | the social marketplace to monetize your personal inventory', tryValidate: true, _user: false });
		}
	});
});


////////////////////////////////////////////////////////////////////////////////
 /// Start Server
 ////////////////////////////////////////////////////////////////////////////////

app.listen(server_port);
console.log('Let\'s PartiO on port '+server_port);