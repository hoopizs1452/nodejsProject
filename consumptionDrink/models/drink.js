var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('Drink Database Connected!');
});

var testSchema = new mongoose.Schema({
  name: String,
  year: String
});

//testSchema.set('collation', 'drink'); //新增需要這行，查詢不需要這行
var testModel = mongoose.model('drink', testSchema);

module.exports = testModel;

// module.exports = mongoose.model(
// 	'drink', testSchema, 'drink');
