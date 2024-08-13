const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path=require("path")

const app = express();
const PORT = 3000;

const user="joseph"
const pass="BDRbxX16I8ccCQ0o"

// Connect to MongoDB
mongoose.connect(`mongodb+srv://${user}:${pass}@cluster0.ho05f.mongodb.net/Server`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

// Create a Mongoose schema and model
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/server_design.html'));
  });
  

// Handle form submission
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    const newUser = new User({ username, password });
    newUser.save()
        .then(() => {
            res.send('User registered successfully');
        })
        .catch((err) => {
            console.error('Error saving user:', err);
            res.status(500).send('Error registering user');
        });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
