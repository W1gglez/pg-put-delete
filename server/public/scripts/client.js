console.log('JavaScript Running');
refreshBooks();

// TODO - Add code for edit & delete buttons

function submitBook(event) {
  event.preventDefault();

  console.log('Submit button clicked.');
  let book = {};
  book.author = document.getElementById('author').value;
  book.title = document.getElementById('title').value;
  addBook(book);
}

// adds a book to the database
function addBook(bookToAdd) {
  axios({
    method: 'POST',
    url: '/books',
    data: bookToAdd,
  })
    .then(function (response) {
      console.log('addBook()', response.data);
      refreshBooks();
    })
    .catch(function (error) {
      console.log('Error in POST', error);
      alert('Unable to add book at this time. Please try again later.');
    });
}

// refreshBooks will get all books from the server and render to page
function refreshBooks() {
  axios({
    method: 'GET',
    url: '/books',
  })
    .then(function (response) {
      console.log('refreshBooks() response', response.data);
      renderBooks(response.data);
    })
    .catch(function (error) {
      console.log('error in GET', error);
    });
}

// Displays an array of books to the DOM
function renderBooks(books) {
  const bookshelf = document.getElementById('bookShelf');
  bookshelf.innerHTML = '';

  for (let i = 0; i < books.length; i += 1) {
    let book = books[i];
    // For each book, append a new row to our table
    bookshelf.innerHTML += `
      <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isRead}</td>
        <td data-id="${book.id}">
          <button onclick="updateRead(event)">Mark as Read</button>
          <button onclick="deleteBook(event)" >Delete</button>
        </td>
      </tr>
    `;
  }
}

function deleteBook(event) {
  console.log('Deleting book by id', event.target.closest('td').dataset.id);
  axios
    .delete(`/books/delete/${event.target.closest('td').dataset.id}`)
    .then((response) => refreshBooks())
    .catch((error) => {
      console.log('error in DELETE', error);
    });
}

function updateRead(event) {
  console.log('Update read by id', event.target.closest('td').dataset.id);
  axios
    .put(`/books/update/${event.target.closest('td').dataset.id}`)
    .then((response) => refreshBooks())
    .catch((error) => {
      console.log('error in DELETE', error);
    });
}
