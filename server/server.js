const express = require('express');
const booksRouter = require('./routes/book.router.js');

const app = express();
app.use(express.json());

app.use('/books', booksRouter);

// Serve back static files by default
app.use(express.static('server/public'))

// Start listening for requests on a specific port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
