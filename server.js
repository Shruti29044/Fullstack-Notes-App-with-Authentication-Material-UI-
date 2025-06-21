
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

mongoose.connect('mongodb://localhost:27017/notesapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});
const User = mongoose.model('User', userSchema);

const noteSchema = new mongoose.Schema({
    title: String,
    content: String,
    image: String,
    userId: String,
});
const Note = mongoose.model('Note', noteSchema);

const SECRET = 'mysecretkey';

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.json({ message: 'User registered successfully' });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'User not found' });
    if (!(await bcrypt.compare(password, user.password))) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ userId: user._id }, SECRET);
    res.json({ token });
});

app.get('/notes', authenticateToken, async (req, res) => {
    const notes = await Note.find({ userId: req.user.userId });
    res.json(notes);
});

app.post('/notes', authenticateToken, async (req, res) => {
    const newNote = new Note({ ...req.body, userId: req.user.userId });
    await newNote.save();
    res.json(newNote);
});

app.put('/notes/:id', authenticateToken, async (req, res) => {
    const updatedNote = await Note.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.userId },
        req.body,
        { new: true }
    );
    if (!updatedNote) return res.sendStatus(404);
    res.json(updatedNote);
});

app.delete('/notes/:id', authenticateToken, async (req, res) => {
    await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    res.sendStatus(204);
});

app.listen(5000, () => console.log('Backend running on http://localhost:5000'));
