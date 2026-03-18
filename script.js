let myLibrary = [];
let libraryContainer = document.querySelector('#container');

let dialog = document.querySelector('#book-dialog');
let form = document.querySelector('form');
let titleText = document.querySelector('#title');
let authorText = document.querySelector('#author');
let pagesText = document.querySelector('#pages');

let openBtn = document.querySelector('#add-book');
let readBtn = document.querySelector('#read-btn');
let cancelBtn = document.querySelector('#cancel-btn');
let submitBtn = document.querySelector('#submit-btn');

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.changeStatus = function() {
  if (this.read) {
    this.read = false;
  } else {
    this.read = true;
  }
}

openBtn.addEventListener('click', () => {
  dialog.showModal();
  console.log("'+ Add Book' button clicked");
});

readBtn.addEventListener('click', () => {
  readBtn.classList.toggle('read');
  if (readBtn.classList.contains('read')) {
    readBtn.value = true;
    readBtn.textContent = 'Read';
  } else {
    readBtn.value = false;
    readBtn.textContent = 'Unread';
  }
});

submitBtn.addEventListener('click', () => {
  if ((titleText.value != '') && (authorText.value != '') && (pagesText.value != '')) {
    addBookToLibrary(titleText.value, authorText.value, pagesText.value, readBtn.value === 'true');
    console.log(myLibrary);
    form.reset();
    dialog.close();
  }
});

cancelBtn.addEventListener('click', () => {
  dialog.close();
  form.reset();
})

function addBookToLibrary(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read);
  newBook.id = crypto.randomUUID();

  myLibrary.push(newBook);

  displayLibrary();
}

addBookToLibrary('Red Rising', 'Pierce Brown', 438, true);
addBookToLibrary('Golden Son', 'Pierce Brown', 442, true);

function resetLibrary() {
  let bookCards = document.querySelectorAll('.book-card');
  bookCards.forEach((bookCard) => {
    bookCard.remove();
  });
}

function displayLibrary() {
  resetLibrary();
  myLibrary.forEach((book) => {
    let card = document.createElement('div');
    card.classList.add('book-card');
    card.dataset.index = book.id;
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

    let buttonHolder = document.createElement('div');
    buttonHolder.classList.add('button-holder');

    let removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-button');
    removeBtn.textContent = 'REMOVE';
    removeBtn.addEventListener('click', (e) => {
      console.log('remove button clicked');
      let removingCard = e.target.closest('.book-card');
      removingCard.remove();
      let removingId = String(removingCard.dataset.index);
      console.log(removingId);
      myLibrary.forEach((book) => {
        if (book.id == removingId) {
          myLibrary.splice(myLibrary.indexOf(book), 1);
        }
      });
      console.log(myLibrary);
    });

    card.append(titleBox, authorBox, pagesBox, buttonHolder);
    buttonHolder.append(removeBtn);
  });
}

displayLibrary();
