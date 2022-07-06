function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) =>
    accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1
  );
}

function getTotalNumberOfBorrows(account, books) {
  let total = 0;
  books.forEach((book) => {
    book.borrows.forEach((borrow) => {
      if (account.id === borrow.id) {
        total++;
      }
    });
  });
  return total;
}

function getBooksPossessedByAccount(account, books, authors) {
  // filter borrowed books matching account that have not been returned
  const possessedBooks = books.filter((book) => {
    const notReturned = book.borrows.find((borrow) => !borrow.returned);
    if (!notReturned) {
      return false;
    }
    return notReturned.id === account.id;
  });
  // loop thru each book (map)
  const booksWithAuthors = possessedBooks.map((book) => {
    // find matching author
    const author = authors.find((author) => author.id === book.authorId);
    // add a matching author property to book
    book.author = author;
    // return the book with the author property
    return book;
  });
  // return all books with authors
  return booksWithAuthors;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
