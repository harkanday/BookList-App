
//creating a class of Book
class Book {
    constructor(title, author, isbn) {
        this.author = author;
        this.title = title;
        this.isbn = isbn;
    }
}


//class:UI
class UI {
    static displayBooks() {

        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector(".list");
        const row = document.createElement('tr');

        row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a class="btn danger">X</a></td>
    `;
        list.appendChild(row);
    }

    static deleteBook(el) {
        if (el.classList.contains('danger')) {
            el.parentElement.parentElement.remove();
        }
    }
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('.form');
        container.insertBefore(div, form);

        setTimeout(() => document.querySelector('.alert').remove(), 2000)
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';

    }


}

//Class:store
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') == null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }
    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }

}

//Event:display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);
//Event:add books
document.querySelector('.add').addEventListener('click', (e) => {
    //get input values
    const author = document.querySelector('#author').value;
    const title = document.querySelector('#title').value;
    const isbn = document.querySelector('#isbn').value;

    //validation

    if (title == '' || author == '' || isbn == '') {
        UI.showAlert('Enter all fields', 'failure')
    }
    else {
        const book = new Book(title, author, isbn);
        UI.addBookToList(book);
        Store.addBook(book);

        //clear fields
        UI.clearFields();

        UI.showAlert('Book added successfully', 'success')
    }
})
//Event:remove books
document.querySelector('.list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.innerHTML);
    UI.showAlert('Book removed Successfully', 'failure')
});

