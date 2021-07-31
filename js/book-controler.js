"use strict";

function init() {
  renderBooks();
}

function renderBooks() {
  gBooks = loadFromStorage("booksDb");
  
  // In case no books, add books to show
  if(gBooks.length === 0 || !gBooks){
    gBooks = [
  {
    id: "x68xde",
    title: "First friends",
    price: "19",
    img: "https://images-na.ssl-images-amazon.com/images/I/51d+JBAhLhL._SY344_BO1,204,203,200_.jpg",
    rating: 3,
  },
  {
    id: "oAzI70",
    title: "How I saved the world",
    price: 12,
    img: "https://images-na.ssl-images-amazon.com/images/I/411j0TUdamL._SX329_BO1,204,203,200_.jpg",
    rating: 3,
  },
  {
    id: "wGjZ0K",
    title: "I alone can fix it",
    price: 29.9,
    img: "https://images-na.ssl-images-amazon.com/images/I/41ItBEAc3kS._SY291_BO1,204,203,200_QL40_FMwebp_.jpg",
    rating: 4,
  },
  {
    id: "beR6Rm",
    title: "If animals kissed good night",
    price: 5,
    img: "https://images-na.ssl-images-amazon.com/images/I/51PRQuO-xjL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg",
    rating: 2,
  },
  {
    id: "Yt7h7l",
    title: "The Cruelty",
    price: "16",
    img: "https://images-na.ssl-images-amazon.com/images/I/41UEsIyJR-S._SY291_BO1,204,203,200_QL40_FMwebp_.jpg",
    rating: 3,
  },
  {
    id: "DEuucl",
    title: "We did win this election",
    price: 24.5,
    img: "https://images-na.ssl-images-amazon.com/images/I/614mb3xlctS._SY291_BO1,204,203,200_QL40_FMwebp_.jpg",
    rating: 3,
  },
];
saveToStorage('booksDb', gBooks);
  }


  var books = getBooksByPageSize();

  var elPageIdx = document.querySelector(".page-idx");
  elPageIdx.innerText = gPageIdx + 1;

  var elContent = document.querySelector(".content");

  var strIn = `<table>
    <tbody>
    <tr>
    <td>𝐢𝐝</td>
    <td>𝐛𝐨𝐨𝐤 𝐜𝐨𝐯𝐞𝐫</td>
    <td onclick="onFilterBy('title')" style="cursor: pointer">𝐭𝐢𝐭𝐥𝐞</td>
    <td onclick="onFilterBy('price')" style="cursor: pointer">𝐩𝐫𝐢𝐜𝐞</td>
    <td colspan="5">𝐚𝐜𝐭𝐢𝐨𝐧𝐬</td>
    </tr>`;

  // If gBooks is empty
  if (books.length === 0) {
    strIn += `<tr>
                <td colspan="5">No books to show</td>
            </tr>
            <tr class="add-tr">
            <td colspan=5>
                    <input type="text" name="title" placeholder="book title">
                    <input type="text" name="price" placeholder="book price">
                    <input type="text" name="img" placeholder="img url">
                    <button onclick="onAddBook()" class="btn">Add book</button>
                </td>
            </tr>
            </tbody>
            </table>`;
    elContent.innerHTML = strIn;
    return;
  }

  var strHtmls = books.map(function (book) {
    return `
            <tr>
                <td>${book.id}</td>
                <td><img src="${book.img}"/></td>
                <td class="change-title-${book.id}">${book.title}</td>
                <td class="change-price-${book.id}">${book.price}$</td>
                <td colspan="3">
                    <button onclick="onReadBook('${book.id}')">Read</button>
                    <button onclick="onUpdateBook('${book.id}',this)">Update</button>
                    <button onclick="onRemoveBook('${book.id}')">Delete</button>
                </td>
            </tr>`;
  });

  strHtmls = strHtmls.join("");

  var strEnd = `<tr class="add-tr">
                    <td colspan=5>
                        <input type="text" name="title" placeholder="book title">
                        <input type="text" name="price" placeholder="book price">
                        <input type="text" name="img" placeholder="img url">
                        <button onclick="onAddBook()" class="btn">Add book</button>
                    </td>
                  </tr>
                    </tbody>
                    </table>`;

  strHtmls = strIn + strHtmls + strEnd;

  elContent.innerHTML = strHtmls;
}

function onAddBook() {
  var elBookTitle = document.querySelector("[name=title]");
  var elBookPrice = document.querySelector("[name=price]");
  var elBookImg = document.querySelector("[name=img]");

  if(!elBookTitle.value || !elBookPrice.value || !elBookImg.value) return;

  addBook(elBookTitle.value, +elBookPrice.value, elBookImg.value);

  elBookTitle.value = "";
  elBookPrice.value = "";
  elBookImg.value = "";

  renderBooks();
}

function onRemoveBook(bookId) {
  deleteBook(bookId);
  renderBooks();
}

function onReadBook(bookId) {
  var elContainer = document.querySelector('.container');
  elContainer.classList.add('add-blur');
  elContainer.style.pointerEvents = "none";

  var elBookReadPopUp = document.querySelector(".book-read");
  elBookReadPopUp.classList.add('book-read-animation')
  elBookReadPopUp.style.visibility = "visible";

  var book = getBookById(bookId);

  var StrHtml = `
  <h2>${book.title}</h2>
  <h3>${book.price}$</h3>
  <div class="desc-img">
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti consequuntur natus soluta distinctio, numquam nihil facilis mollitia itaque ullam dignissimos dicta atque accusantium officia doloremque ea minima tempora maiores voluptatem, officiis, ipsam iste laborum quos! At ipsam ratione laborum, corporis culpa itaque, mollitia veniam alias fugiat a ex, atque repellendus.</p>
      <img src="${book.img}" />
  </div>
  <div class="rating">
    <div onclick="onSetRating('${bookId}', 1)" class="rate">${setDisplayRating(
    book,
    1
  )}</div>
    <div onclick="onSetRating('${bookId}', 2)"  class="rate"">${setDisplayRating(
    book,
    2
  )}</div>
    <div onclick="onSetRating('${bookId}', 3)"  class="rate"">${setDisplayRating(
    book,
    3
  )}</div>
    <div onclick="onSetRating('${bookId}', 4)"  class="rate">${setDisplayRating(
    book,
    4
  )}</div>
    <div onclick="onSetRating('${bookId}', 5)"  class="rate">${setDisplayRating(
    book,
    5
  )}</div>
  </div>
  <button onclick="closeReadBook()" class="go-back-btn">Go back</button>`;

  elBookReadPopUp.innerHTML = StrHtml;
}

function closeReadBook() {
    var elContainer = document.querySelector('.container');
    elContainer.classList.remove('add-blur');
    elContainer.style.pointerEvents = "auto";
    
    var elBookReadPopUp = document.querySelector(".book-read");
    elBookReadPopUp.style.visibility = "hidden";
    elBookReadPopUp.classList.remove('book-read-animation');
}

function onUpdateBook(bookId, elChangeBtn) {

  // If update already clicked the first time, send the data to the service
  if (elChangeBtn.classList.contains("first-clicked")) {
    var elBookTitle = document.querySelector("[name=title-update]");
    var elBookPrice = document.querySelector("[name=price-update]");

    updateBook(bookId, elBookTitle.value, elBookPrice.value);
    elChangeBtn.classList.remove("first-clicked");
    renderBooks();
    return;
  }

  // First click on update button
  var elTitle = document.querySelector(`.change-title-${bookId}`);
  var elPrice = document.querySelector(`.change-price-${bookId}`);

  var oldTitle = elTitle.innerText;
  var oldPrice = elPrice.innerText;

  elTitle.innerHTML = `
        <input type="text" name="title-update" placeholder="${oldTitle}">
    `;

  elPrice.innerHTML = `
        <input type="text" name="price-update" placeholder="${oldPrice}">
    `;

  elChangeBtn.classList.add("first-clicked");
}

function onSetRating(bookId, rate) {
  var elRates = document.querySelectorAll(".rate");

  // set 0 from 1
  if (
    rate === 1 &&
    elRates[0].innerHTML === "🟡" &&
    elRates[1].innerHTML === "⚫"
  ) {
    elRates[0].innerHTML = "⚫";
    // Clean
    for (var i = 0; i < 5; i++) {
      elRates[i].innerHTML = "⚫";
    }
    setBookRating(bookId, 0);
    return;
  }

  // Clean
  for (var i = 0; i < 5; i++) {
    elRates[i].innerHTML = "⚫";
  }

  // Set
  for (var i = 0; i < rate; i++) {
    elRates[i].innerHTML = "🟡";
  }

  setBookRating(bookId, rate);
}

function setDisplayRating(book, pos) {
  return pos <= book.rating ? "🟡" : "⚫";
}

function onNextPage(indicator) {
  if (indicator === "-" && gPageIdx === 0) return;
  if (indicator === "+" && (gPageIdx + 1) * PAGE_SIZE > gBooks.length) return;

  nextPage(indicator);
  renderBooks();
}

function onFilterBy(filterBy) {
  filterBooks(filterBy);
  renderBooks();
}
