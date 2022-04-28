// Book Constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor
function UI(){
    // Add Book to List
    UI.prototype.addBookToList = function (book){
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

}

// Delete Book

UI.prototype.deleteBook = function (target){
    target.parentElement.parentElement.remove();
}

// Show Alert
UI.prototype.showAlert = function(message, className){
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


// Clear Fields

UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// Add event Listener to add book

document.getElementById('book-form').addEventListener('submit', function(e){
    // Get form values

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    // Instantiate book

    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI()

    // console.log(ui);

    // Validate
    if(title === '' || author === '' || isbn === ''){
        ui.showAlert('Please fill in all fields!', 'error')
    } else {
        // Show success alert
        ui.showAlert('Book Added!', 'success');

        // Add book to list
        ui.addBookToList(book);

        // Clear fields
        ui.clearFields();
    
    }


    e.preventDefault();
})

// Add Event Listener to delete book

document.getElementById('book-list').addEventListener('click', function(e){

    // Instantiate UI
    const ui = new UI()

    ui.deleteBook(e.target);

    // Show Alert
    ui.showAlert('Book Removed!', 'success');

    e.preventDefault()
})