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

// returns an array of 5 or fewer objects that represents the most common occuring genres
//ordered from most common to least.
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
  for (let entry in genreCounter) {
    const genreIDCount = genreCounter[entry];
    const [key, value] = genreIDCount;
    genreObjectsArray.push({ name: key, count: value });
    console.log(key, value);
  }
  console.log(genreObjectsArray);
}

function getMostPopularBooks(books) {}

function getMostPopularAuthors(books, authors) {}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
