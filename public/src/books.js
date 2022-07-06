function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const checkedOut = [];
  const returned = [];
  books.forEach((book) => {
    if (book.borrows[0].returned) {
      returned.push(book);
    } else {
      checkedOut.push(book);
    }
  });
  return [checkedOut, returned];
}

function getBorrowersForBook(book, accounts) {
  // map book borrows
  return (
    book.borrows
      .map((borrow) => {
        // find matching account(s)
        let account = accounts.find((account) => account.id === borrow.id);
        // return borrow key with account info
        return { ...borrow, ...account };
      })
      // limit to 10 items
      .slice(0, 10)
  );
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
