"use strict";

const PAGE_SIZE = 4;

var gBooks = [];
var gPageIdx = 0;

function updateBook(bookId, title, price, imgUrl) {
  var book = getBookById(bookId);

  if (title) book.title = title;
  if (price) book.price = price;
  if (imgUrl) book.img = imgUrl;

  _saveBooksToStorage();
}

function deleteBook(bookId) {
  var bookId = gBooks.findIndex(function (book) {
    return bookId === book.id;
  });
  gBooks.splice(bookId, 1);
  _saveBooksToStorage();
}

function addBook(title, price, imgUrl) {
  var book = _createBook(title, price, imgUrl);
  gBooks.unshift(book);
  _saveBooksToStorage();
}

function getBookById(bookId) {
  var book = gBooks.find(function (book) {
    return book.id === bookId;
  });

  return book;
}

function getBooksByPageSize() {
  var startIdx = gPageIdx * PAGE_SIZE;
  return gBooks.slice(startIdx, startIdx + PAGE_SIZE);
}

function setBookRating(bookId, rating) {
  var book = getBookById(bookId);
  book.rating = rating;
  _saveBooksToStorage();
}

function _createBook(title, price, imgUrl) {
  return {
    id: makeId(),
    title: title,
    price: price,
    img: imgUrl,
    rating: 0,
  };
}

function _saveBooksToStorage() {
  saveToStorage("booksDb", gBooks);
}

function nextPage(indicator) {
  if (indicator === "+") {
    gPageIdx++;
  } else if (indicator === "-") {
    gPageIdx--;
  }
}

function filterBooks(filterBy) {
  // filterBy = 'title' / 'price
  var books = gBooks.sort(function (a, b) {
    if (a[filterBy] > b[filterBy]) return 1;
    if (a[filterBy] < b[filterBy]) return -1;
  });

  gBooks = books;
  _saveBooksToStorage();
}
