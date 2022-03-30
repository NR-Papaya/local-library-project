function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((booksBorrowed, book) => {
    const { borrows } = book;
    if (!borrows[0].returned) {
      booksBorrowed.push(book);
    }
    return booksBorrowed;
  }, []).length;
}


function getMostCommonGenres(books) {
  const genreArray = books.reduce((genres, book) => {
    genres.push(book.genre);
    return genres;
  }, []);

  const genreCounter = genreArray.reduce((genreCount, genre) => {
    if (genreCount[genre]) {
      genreCount[genre] += 1;
      return genreCount;
    } else {
      genreCount[genre] = 1;
      return genreCount;
    }
  }, {});

  const genreObjectsArray = [];
  for (const [key, value] of Object.entries(genreCounter)) {
    genreObjectsArray.push({ name: key, count: value });
  }
  return genreObjectsArray
    .sort((genreA, genreB) => genreB.count - genreA.count)
    .slice(0, 5);
}

function getMostPopularBooks(books) {
  return books
    .reduce((booksObjArray, book) => {
      booksObjArray.push({ name: book.title, count: book.borrows.length });
      return booksObjArray;
    }, [])
    .sort((bookObjA, bookObjB) => bookObjB.count - bookObjA.count)
    .slice(0, 5);
}

function _getBorrowCountPerAuthor(books, author) {
  const filteredBooksBorCount = books.map((book) => {
    if (book.authorId === author.id) {
      return book.borrows.length;
    } else {
      return 0;
    }
  });
  return filteredBooksBorCount.reduce((total, book) => {
    return total + book;
  }, 0);
}

function getMostPopularAuthors(books, authors) {
  return authors
    .map((author) => {
      return {
        name: `${author.name.first} ${author.name.last}`,
        count: _getBorrowCountPerAuthor(books, author),
      };
    })
    .sort((authorA, authorB) => (authorB.count > authorA.count ? 1 : -1))
    .slice(0, 5);
}
module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
