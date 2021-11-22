var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('Consumption Database Connected!');
});

var testSchema = new mongoose.Schema({
  date: Date,
  name: String,
  price: String
});

//testSchema.set('collation', 'consumption'); //新增需要這行，查詢不需要這行
var testModel = mongoose.model('consumption', testSchema);

module.exports = testModel;

// module.exports = mongoose.model(
// 	'consumption', testSchema, 'consumptions');
