
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, TextField, Button, Card, CardContent, Snackbar, CircularProgress, Box, Grid } from '@mui/material';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

function Home() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchNotes = () => {
    setLoading(true);
    axios.get('http://localhost:5000/notes', { headers: { Authorization: token } })
      .then(res => setNotes(res.data))
      .catch(() => setError('Auth error, please login again'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (token) fetchNotes();
    else navigate('/login');
  }, [token]);

  const addNote = () => {
    if (!title || !content) return setError('Fill title & content');
    axios.post('http://localhost:5000/notes', { title, content }, { headers: { Authorization: token } })
      .then(() => { fetchNotes(); setTitle(''); setContent(''); })
      .catch(() => setError('Error adding note'));
  };

  const deleteNote = (id) => {
    axios.delete(`http://localhost:5000/notes/${id}`, { headers: { Authorization: token } })
      .then(() => fetchNotes())
      .catch(() => setError('Error deleting note'));
  };

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar><Typography variant="h6">Notes App</Typography></Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>
          <Button variant="contained" onClick={() => navigate('/profile')}>Profile</Button>
        </Box>
        <Box mb={2}>
          <TextField label="Title" fullWidth value={title} onChange={e => setTitle(e.target.value)} margin="dense" />
          <TextField label="Content" fullWidth value={content} onChange={e => setContent(e.target.value)} margin="dense" multiline rows={4} />
          <Button variant="contained" onClick={addNote} fullWidth sx={{ mt: 2 }}>Add Note</Button>
        </Box>
        {loading ? <CircularProgress /> : (
          <Grid container spacing={2}>
            {notes.map(note => (
              <Grid item xs={12} sm={6} md={4} key={note._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{note.title}</Typography>
                    <Typography>{note.content}</Typography>
                    <Button variant="outlined" color="error" sx={{ mt: 1 }} onClick={() => deleteNote(note._id)}>Delete</Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        <Snackbar open={!!error} message={error} autoHideDuration={4000} onClose={() => setError('')} />
      </Container>
    </div>
  );
}

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const register = () => {
    if (!username || !password) return setError('Fill both fields');
    axios.post('http://localhost:5000/register', { username, password })
      .then(() => setError('Registered! You can login.'))
      .catch(() => setError('Registration failed'));
  };

  const login = () => {
    if (!username || !password) return setError('Fill both fields');
    axios.post('http://localhost:5000/login', { username, password })
      .then(res => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', username);
        navigate('/');
      })
      .catch(() => setError('Login failed'));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" sx={{ mt: 5 }}>Login / Register</Typography>
      <TextField label="Username" fullWidth margin="normal" value={username} onChange={e => setUsername(e.target.value)} />
      <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button variant="contained" onClick={register}>Register</Button>
        <Button variant="contained" color="primary" onClick={login}>Login</Button>
      </Box>
      <Snackbar open={!!error} message={error} autoHideDuration={4000} onClose={() => setError('')} />
    </Container>
  );
}

function Profile() {
  const username = localStorage.getItem('username') || 'Unknown';
  const navigate = useNavigate();
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ mt: 5 }}>Profile</Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>Username: {username}</Typography>
      <Button variant="contained" sx={{ mt: 4 }} onClick={() => navigate('/')}>Back</Button>
    </Container>
  );
}

export default App;
