function findAccountById(accounts, id) {
  return accounts.find((account) => account.id.includes(id));
}

function sortAccountsByLastName(accounts) {
  const acctsAry = [...accounts];

  return acctsAry.sort((firstAcc, secondAcc) =>
    firstAcc.name.last.toLowerCase() < secondAcc.name.last.toLowerCase()
      ? -1
      : 1
  );
}

function getTotalNumberOfBorrows(account, books) {
  let count = 0;
  for (let book in books) {
    const currentBook = books[book];
    const borrowsArray = currentBook.borrows;
    count += borrowsArray.reduce((counterAcc, idSet) => {
      const id = idSet.id;
      if (id == account.id) {
        counterAcc += 1;
      }
      return counterAcc;
    }, 0);
  }
  return count;
}

function getBooksPossessedByAccount(account, books, authors) {
  return books.reduce((accArray, book) => {
    const { id } = account;
    const borrowerIDs = book.borrows.reduce((matchingIDs, borrowEntry) => {
      const borrowSetID = borrowEntry.id;
      const returnedFlag = borrowEntry.returned;
      if (borrowSetID === id && returnedFlag === false) {
        matchingIDs.push(borrowEntry);
      }
      return matchingIDs;
    }, []);
    if (borrowerIDs.length > 0) {
      const authorInfo = authors.find((author) => author.id === book.authorId);
      delete book["borrows"];
      book["author"] = authorInfo;
      book["borrows"] = borrowerIDs;
      accArray.push(book);
    }
    return accArray;
  }, []);
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
