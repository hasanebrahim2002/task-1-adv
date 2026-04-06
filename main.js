var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Book = /** @class */ (function () {
    function Book(title, author, category, isAvailable) {
        this.title = title;
        this.author = author;
        this.category = category;
        this.isAvailable = isAvailable;
    }
    Book.prototype.getTitle = function () {
        return this.title;
    };
    Book.prototype.getAuthor = function () {
        return this.author;
    };
    Book.prototype.getCategory = function () {
        return this.category;
    };
    Book.prototype.getIsAvailable = function () {
        return this.isAvailable;
    };
    Book.prototype.setIsAvailable = function () {
        this.isAvailable = !this.isAvailable;
    };
    Book.prototype.displayInfo = function () {
        return "Title : ".concat(this.title, "\n     Author : ").concat(this.author, "\n      Category : ").concat(this.category, "\n       Avaliable : ").concat(this.isAvailable ? "Avaliable" : "NotAvaliable");
    };
    return Book;
}());
var Library = /** @class */ (function () {
    function Library() {
        this.books = [];
    }
    Library.prototype.addBook = function (book) {
        this.books.push(book);
    };
    Library.prototype.removeBook = function (book) {
        var index = this.books.indexOf(book);
        this.books.splice(index, 1);
    };
    Library.prototype.searchBooks = function (value) {
        return this.books.filter(function (book) {
            return book.getTitle().toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
                book.getAuthor().toLowerCase().indexOf(value.toLowerCase()) !== -1;
        });
    };
    Library.prototype.filterByCategory = function (value) {
        if (value == "all") {
            return this.books;
        }
        return this.books.filter(function (book) { return book.getCategory().indexOf(value) !== -1; });
    };
    Library.prototype.toggleAvailability = function (book) {
        book.setIsAvailable();
    };
    Library.prototype.getBooks = function () {
        return this.books;
    };
    return Library;
}());
var ReferenceBook = /** @class */ (function (_super) {
    __extends(ReferenceBook, _super);
    function ReferenceBook(title, author, category, isAvailable, locationCode) {
        var _this = _super.call(this, title, author, category, isAvailable) || this;
        _this.locationCode = locationCode;
        return _this;
    }
    ReferenceBook.prototype.getLocationCode = function () {
        return this.locationCode;
    };
    ReferenceBook.prototype.displayInfo = function () {
        return _super.prototype.displayInfo.call(this) + "\nLocationCode : ".concat(this.locationCode);
    };
    return ReferenceBook;
}(Book));
var containerOfBooks = document.querySelector(".containerOfBooks");
var selectInput = document.getElementById("filterByCategory");
var books = [
    new Book("TypeScript", "Hasan", "Programming", true),
    new Book("JavaScript", "Ali", "Programming", true),
    new Book("Html", "Ahmad", "Education", false),
    new Book("React", "Mohammed", "Programming", true),
    new Book("Algorithms", "Khaled", "Education", false),
    new Book("C#", "Slman", "Programming", false),
    new ReferenceBook("C++", "Nader", "Education", true, "T1,F1"),
    new ReferenceBook("Python", "Hussien", "Education", false, "T2,F1"),
    new ReferenceBook("ASP.Net", "Maher", "Education", true, "T3,F1"),
];
var library = new Library();
books.forEach(function (book) { return library.addBook(book); });
addBooksToPage(library.getBooks());
updateCategory();
var searchInput = document.querySelector(".searchInput");
searchInput.addEventListener("input", function () {
    var valueInput = searchInput.value.toLowerCase();
    var filterd = library.searchBooks(valueInput);
    addBooksToPage(filterd);
});
var titleInput = document.querySelector(".titleInput");
var authorInput = document.querySelector(".authorInput");
var categoryInput = document.querySelector(".categoryInput");
var button = document.querySelector(".AddButton");
button === null || button === void 0 ? void 0 : button.addEventListener("click", function () {
    var valueTitle = titleInput.value.trim();
    var valueAuthor = authorInput.value.trim();
    var valueCategory = categoryInput.value.trim();
    if (valueTitle && valueAuthor && valueCategory) {
        var newBook = new Book(valueTitle, valueAuthor, valueCategory, true);
        library.addBook(newBook);
        addBooksToPage(library.getBooks());
        updateCategory();
    }
    titleInput.value = "";
    authorInput.value = "";
    categoryInput.value = "";
});
selectInput.addEventListener("change", function () {
    var valueSelect = selectInput.value;
    var filterd = library.filterByCategory(valueSelect);
    addBooksToPage(filterd);
});
function updateCategory() {
    selectInput.innerHTML = "";
    var categories = ["all"];
    library.getBooks().forEach(function (book) {
        if (categories.indexOf(book.getCategory()) === -1)
            categories.push(book.getCategory());
    });
    categories.forEach(function (category) {
        var optionTag = document.createElement("option");
        optionTag.value = category;
        optionTag.textContent = category;
        selectInput.appendChild(optionTag);
    });
}
function addBooksToPage(books) {
    containerOfBooks.innerHTML = "";
    books.forEach(function (book) {
        var buttonValiable = document.createElement("button");
        buttonValiable.textContent = "Change State";
        buttonValiable.className = "valiable";
        buttonValiable.addEventListener("click", function () {
            library.toggleAvailability(book);
            addBooksToPage(library.getBooks());
        });
        var card = document.createElement("div");
        card.textContent = book.displayInfo();
        card.appendChild(buttonValiable);
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete";
        deleteButton.addEventListener("click", function () {
            library.removeBook(book);
            addBooksToPage(library.getBooks());
            updateCategory();
        });
        card.appendChild(deleteButton);
        containerOfBooks.appendChild(card);
    });
}
