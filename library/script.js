let books = [];

const form = document.getElementById("book-form");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const bookList = document.getElementById("book-list");
const bookCount = document.getElementById("book-count");
const emptyMessage = document.getElementById("empty-message");
const message = document.getElementById("message");

function saveBooks() {
    try {
        localStorage.setItem("library-books", JSON.stringify(books));
    } catch {
        message.textContent = "Не удалось сохранить книги в браузере. После закрытия страницы изменения могут пропасть.";
    }
}

function loadBooks() {
    try {
        const data = JSON.parse(localStorage.getItem("library-books") || "[]");

        if (!Array.isArray(data)) {
            throw new Error();
        }

        for (const book of data) {
            if (!book || typeof book.title !== "string" || typeof book.author !== "string") {
                throw new Error();
            }
        }

        books = data;
    } catch {
        message.textContent = "Не удалось загрузить сохранённые книги.";
    }

    showBooks();
}

function showBooks() {
    bookList.textContent = "";
    bookCount.textContent = books.length;
    emptyMessage.hidden = books.length > 0;

    books.forEach(function (book, index) {
        const card = document.createElement("div");
        card.className = "book";

        const title = document.createElement("h3");
        title.textContent = book.title;

        const author = document.createElement("p");
        author.textContent = "Автор: " + book.author;

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Удалить";
        deleteButton.setAttribute("aria-label", "Удалить книгу «" + book.title + "»");

        deleteButton.addEventListener("click", function () {
            books.splice(index, 1);
            showBooks();
            message.textContent = "Книга удалена.";
            saveBooks();
        });

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(deleteButton);
        bookList.appendChild(card);
    });
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = titleInput.value.trim();
    const author = authorInput.value.trim();

    if (title === "" || author === "") {
        message.textContent = "Введите название книги и имя автора.";
        return;
    }

    books.push({ title: title, author: author });
    showBooks();
    form.reset();
    titleInput.focus();
    message.textContent = "Книга добавлена.";
    saveBooks();
});

loadBooks();
