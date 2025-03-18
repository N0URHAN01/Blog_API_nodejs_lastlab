require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json()); 

const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api', commentRoutes);


app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

app.listen(3000, () => console.log('Server running on port 3000'));
