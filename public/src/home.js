function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((acc, book) => {
    return (
      acc +
      book.borrows.filter((notReturned) => notReturned.returned === false)
        .length
    );
  }, 0);
}

function getMostCommonGenres(books) {
  // create array of objects
  const commonGenres = {};
  // for each book, if the genre exists in the object, increase the value by 1, else, add the genre with a value of 1
  books.forEach((book) => {
    if (commonGenres[book.genre]) {
      commonGenres[book.genre].count++;
    } else {
      commonGenres[book.genre] = { name: book.genre, count: 1 };
    }
  });
  return Object.values(commonGenres)
    .sort((genreA, genreB) => genreB.count - genreA.count)
    .slice(0, 5);
}

function getMostPopularBooks(books) {
  // map books to a new array of objects with a name (title) and count (number of borrows)
  return (
    books
      .map((book) => {
        return { name: book.title, count: book.borrows.length };
      })
      // sort highest to lowest with a limit of 5 items
      .sort((bookA, bookB) => bookB.count - bookA.count)
      .slice(0, 5)
  );
}

function helperFunction(array) {
  let sortedArray = array
    .sort((itemA, itemB) => itemB.count - itemA.count)
    .slice(0, 5);
  return sortedArray;
}

function getMostPopularAuthors(books, authors) {
  // for each author, create an object containing the name of the author and the count of borrows
  const result = [];
  authors.forEach((author) => {
    let authorInfo = {
      name: `${author.name.first} ${author.name.last}`,
      count: 0,
    };
    //loop thru the books and borrows to count the number of times the author's books have been borrowed.
    books.forEach((book) => {
      if (book.authorId === author.id) {
        authorInfo.count += book.borrows.length;
      }
    });
    result.push(authorInfo);
  });
  // return an array of objects containing the name of the author and the count of borrows
  return helperFunction(result);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
