const myLibrary = [];
let libraryContainer = document.querySelector('#container');

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read);
  newBook.id = crypto.randomUUID();

  myLibrary.push(newBook);
}

addBookToLibrary('Red Rising', 'Pierce Brown', 438, true);
addBookToLibrary('Golden Son', 'Pierce Brown', 442, true);

function displayLibrary() {
  myLibrary.forEach((book) => {
    let card = document.createElement('div');
    card.classList.add('book-card');
    libraryContainer.appendChild(card);

    let titleBox = document.createElement('div');
    titleBox.classList.add('titleBox');
    titleBox.textContent = book.title;

    let authorBox = document.createElement('div');
    authorBox.classList.add('authorBox');
    authorBox.textContent = book.author;

    let pagesBox = document.createElement('div');
    pagesBox.classList.add('pagesBox');
    pagesBox.textContent = book.pages;

    card.append(titleBox, authorBox, pagesBox);
  });
}

displayLibrary();
