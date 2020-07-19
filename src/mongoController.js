const mongoose = require('mongoose');

var options = {
  useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}

mongoose
  .connect(process.env.MONGO_URI, options)
  .then(() => {
    console.log("Connected to Mongoose ");

  })
  .catch(err => {
    console.log("Mongoose Error: ", err);
  });


const TodoSchema = new mongoose.Schema({
  item: { type: String }
});

const Todo = mongoose.model('Todo', TodoSchema);

// Create data
const data = [
  'Meet client at Aqila House',
  'Call the wife',
  'Go shopping',
  'Fuck the wife off',
  'Call children',
  'Buy flowers for the wife'
]

function installData() {
  data.forEach((item) => {
    const current = new Todo({ item: item })
      .save((err) => {
        if (err) throw err;
        console.log('Item Saved');
      })
  })
}

module.exports.todo = Todo;
module.exports.install = installData;