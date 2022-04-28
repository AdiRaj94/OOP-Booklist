class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI{
    addBookToList(book){
        const list = document.getElementById('book-list');
        // Create tr element
        const row = document.createElement('tr');
        // Insert cols
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href ='#' class="delete">X</a></td>
        `
        list.appendChild(row)
    }

    deleteBook(target){
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
          }
    }

    showAlert(message, className){
        // Create Element div
        const div = document.createElement('div');

        // Add className
        div.className = `alert ${className}`

        // Add text
        div.appendChild(document.createTextNode(message))

        // Get parent
        const container = document.querySelector('.container')
        // Get form
        const form = document.querySelector('#book-form');

        // Insert Before
        container.insertBefore(div, form);

        // Timeout after 3sec

        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);
    }

    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

// Local Storage

class store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static displayBooks(){
        const books = store.getBooks();

        books.forEach(function(book){
            // Instantiate ui
            const ui = new UI;
            // Add book to list
            ui.addBookToList(book);
        })
    }

    static addBook(book){
        const books = store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = store.getBooks();

        books.forEach(function (book, index){
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });
    }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', store.displayBooks);


// Add event Listener to add book

document.getElementById('book-form').addEventListener('submit', function(e){
    // Get form values

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    // Instantiate book

    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI();

    // console.log(ui);

    // Validate
    if(title === '' || author === '' || isbn === ''){
        ui.showAlert('Please fill in all fields!', 'error')
    } else {
        // Show success alert
        ui.showAlert('Book Added!', 'success');

        // Add book to list
        ui.addBookToList(book);

        // Add to local storage
        store.addBook(book);

        // Clear fields
        ui.clearFields();
    
    }


    e.preventDefault();
})


// Add Event Listener to delete book

document.getElementById('book-list').addEventListener('click', function(e){

    // Instantiate UI
    const ui = new UI()

    // Delete Book
    ui.deleteBook(e.target);

    // Remove Book
    store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // Show Alert
    ui.showAlert('Book Removed!', 'success');

    e.preventDefault()
})