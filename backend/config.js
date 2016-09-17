exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || (
	process.env.NODE_ENV === 'production' ? 
		'mongodb://testbg:testbg@ds033096.mlab.com:33096/backgammon' : 
		'mongodb://testbg:testbg@ds033096.mlab.com:33096/backgammon'
);
exports.PORT = process.env.PORT || 8080;