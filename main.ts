class Book {
  private title;
  private author;
  private category;
  private isAvailable;
  constructor(
    title: string,
    author: string,
    category: string,
    isAvailable: boolean,
  ) {
    this.title = title;
    this.author = author;
    this.category = category;
    this.isAvailable = isAvailable;
  }
  getTitle(): string {
    return this.title;
  }
  getAuthor(): string {
    return this.author;
  }
  getCategory(): string {
    return this.category;
  }
  getIsAvailable(): boolean {
    return this.isAvailable;
  }
  setIsAvailable() {
    this.isAvailable = !this.isAvailable;
  }
  displayInfo(): string {
    return `Title : ${this.title}
     Author : ${this.author}
      Category : ${this.category}
       Avaliable : ${this.isAvailable ? "Avaliable" : "NotAvaliable"}`;
  }
}

class Library {
  private books: Array<Book> = [];
  addBook(book: Book) {
    this.books.push(book);
  }
  removeBook(book: Book) {
    const index = this.books.indexOf(book);
    this.books.splice(index, 1);
  }
  searchBooks(value: string): Book[] {
    return this.books.filter(
      (book) =>
        book.getTitle().toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
        book.getAuthor().toLowerCase().indexOf(value.toLowerCase()) !== -1,
    );
  }
  filterByCategory(value: string): Book[] {
    if (value == "all") {
      return this.books;
    }
    return this.books.filter(
      (book) => book.getCategory().indexOf(value) !== -1,
    );
  }
  toggleAvailability(book: Book) {
    book.setIsAvailable();
  }
  getBooks(): Book[] {
    return this.books;
  }
}

class ReferenceBook extends Book {
  private locationCode;
  constructor(
    title: string,
    author: string,
    category: string,
    isAvailable: boolean,
    locationCode: string,
  ) {
    super(title, author, category, isAvailable);
    this.locationCode = locationCode;
  }
  getLocationCode(): string {
    return this.locationCode;
  }
  displayInfo(): string {
    return super.displayInfo() + `\nLocationCode : ${this.locationCode}`;
  }
}
const containerOfBooks = document.querySelector(".containerOfBooks")!;
const selectInput = document.getElementById(
  "filterByCategory",
) as HTMLSelectElement;
const books: Array<Book> = [
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
const library = new Library();
books.forEach((book) => library.addBook(book));
addBooksToPage(library.getBooks());
updateCategory();

const searchInput: HTMLInputElement = document.querySelector(".searchInput")!;
searchInput.addEventListener("input", () => {
  const valueInput = searchInput.value.toLowerCase();
  const filterd = library.searchBooks(valueInput);
  addBooksToPage(filterd);
});

const titleInput: HTMLInputElement = document.querySelector(".titleInput")!;
const authorInput: HTMLInputElement = document.querySelector(".authorInput")!;
const categoryInput: HTMLInputElement =
  document.querySelector(".categoryInput")!;
const button: HTMLInputElement = document.querySelector(".AddButton")!;
button?.addEventListener("click", () => {
  const valueTitle = titleInput.value.trim();
  const valueAuthor = authorInput.value.trim();
  const valueCategory = categoryInput.value.trim();

  if (valueTitle && valueAuthor && valueCategory) {
    const newBook = new Book(valueTitle, valueAuthor, valueCategory, true);
    library.addBook(newBook);
    addBooksToPage(library.getBooks());
    updateCategory();
  }
  titleInput.value = "";
  authorInput.value = "";
  categoryInput.value = "";
});

selectInput.addEventListener("change", () => {
  const valueSelect = selectInput.value;
  const filterd = library.filterByCategory(valueSelect);
  addBooksToPage(filterd);
});

function updateCategory() {
  selectInput.innerHTML = "";
  const categories: Array<string> = ["all"];
  library.getBooks().forEach((book) => {
    if (categories.indexOf(book.getCategory()) === -1)
      categories.push(book.getCategory());
  });
  categories.forEach((category) => {
    const optionTag = document.createElement("option");
    optionTag.value = category;
    optionTag.textContent = category;
    selectInput.appendChild(optionTag);
  });
}
function addBooksToPage(books: Book[]) {
  containerOfBooks.innerHTML = "";

  books.forEach((book) => {
    const buttonValiable = document.createElement("button");
    buttonValiable.textContent = "Change State";
    buttonValiable.className = "valiable";
    buttonValiable.addEventListener("click", () => {
      library.toggleAvailability(book);
      addBooksToPage(library.getBooks());
    });
    const card = document.createElement("div");
    card.textContent = book.displayInfo();
    card.appendChild(buttonValiable);
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete";
    deleteButton.addEventListener("click", () => {
      library.removeBook(book);
      addBooksToPage(library.getBooks());
      updateCategory();
    });
    card.appendChild(deleteButton);
    containerOfBooks.appendChild(card);
  });
}
