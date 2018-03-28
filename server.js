let express     = require('express'),
    app         = express(),
    mongoose    = require('mongoose'),
    path        = require('path'),
    session     = require('express-session'),
    body_parser = require('body-parser');
var uniqueValidator = require('mongoose-unique-validator');//to evaluate uniqueness. The internet said it was a good idea.

app.use(express.static( __dirname + '/client/dist' ));
app.use(body_parser.json());
app.use(express.static(path.join(__dirname, "static")));
app.use(session({
    secret: 'CodingDojoRocksF4hWAhtgUb8BrRqWPuR$%4w^@FSB3j*VfumMEJB8SPpr57%aqRmsEyHGhJKcvgu9#W&5ZvUrCZ*q4c%8^A9RJ49@Mf3X',
    proxy: true,
    resave: false,
    saveUninitialized: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/pets_shelterdb');
mongoose.Promise = global.Promise;

// Example User Schema
let Schema = mongoose.Schema;


let PetsSchema = new mongoose.Schema({
  name: {type: String, required: [true, 'pet name is required'],
              minlength: [3, 'pet name must be at least 3 characters.'], 
              unique: [true,'Name is already taken.']},
  type: {type: String, required: [true, 'type is required.'], minlength: [3, 'pet type must be longer than 2 characters.']},
  description: {type: String, required: [true, 'description is a required field.'],
              minlength: [3, 'pet description must be longer than 2 characters.']},
  likes: {type: Number},
  skills: [{type: Schema.Types.ObjectId, max: 3, ref: 'Skills'}]
}, {timestamps: true})

mongoose.model('pet', PetsSchema);
let Pet = mongoose.model('pet');

var SkillsSchema = new mongoose.Schema({
  _skills: {type: Schema.Types.ObjectId, ref: 'skills'},
  skill: {type: String},
}, {timestamps: true });
mongoose.model('Skills', SkillsSchema);
var Skills = mongoose.model('Skills');
PetsSchema.plugin(uniqueValidator);

app.get('/pets', (req, res) => {
  let pets = Pet.find({}, (err, pets) => {
    //sort these by type for BB!find().sort({type})
    if (err) {
      res.status(400).json({message: 'Error', error: err});
    } else {
      // console.log(pets);
      res.json({message: 'Success', data: pets})
    }
  });
  // res.render('index');
})
app.get('/pets/:id', (req, res) => {
  let currentpet = Pet.findOne({_id: req.params.id}, (err, currentpet) => {
    if (err) {
      res.status(400).json({message: 'Error', error: err});
    } else {
      res.json({message: 'Success', data: currentpet})
    }
  });
});
app.post('/pets/add', (req, res) =>{
    let pet = new Pet(req.body);
    // let skill = new Skills(req.body);
    console.log(req.body);
    pet.save( (err) => {
        if(err){
            res.json({message: 'ERRRRRRRROOOORRRRRRRR', errors: err})
        }
        else {
            console.log(pet._id);
            res.json({message: 'Success', data: pet});
        }
    });
})
app.patch('/pets/edit/:id', (req, res) => {
  // User.findOneAndUpdate( this is an example to make sure validations are run.
  //   { email: 'old-email@example.com' },
  //   { email: 'new-email@example.com' },
  //   { runValidators: true, context: 'query' },
  //   function(err) {
  console.log(req.params.id+"the router function is running.");
  let pet = pet.findOne({_id: req.params.id}, (err, pet) => {
    // console.log(req.params.id);
    console.log(pet);
    // console.log(editTask);
    if (err) {
      // console.log(err);
      res.json({message: 'Error', error: err});
    } else {
      pet.name = req.body.name;
      pet.type = req.body.type;
      pet.description = req.body.description;
      // task.completed = req.params.completed;
      pet.save( (err) => {
        if (err) {
          console.log("almost there.")
          res.json({message: 'Error', error: err});
        } else {
          res.json({message: 'Success', data: pet});
        }
      })
    }
  })
})
app.delete('/pets/:id', (req, res) => {
  console.log('deleting');
  console.log(req.params.id);
  Pet.findOneAndRemove({_id: req.params.id}, (err) => {
    if (err) {
      res.json({message: 'Error', error: err});
    } else {
      res.json({message: 'Sucessful delete'});
    }
  });
});
app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./client/dist/index.html"))
});
// Other routes

let server = app.listen(6789, () => {
    console.log("listening on port 6789");
});