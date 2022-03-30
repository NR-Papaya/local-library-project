function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  return books.reduce(
    (partArray, book) => {
      const { borrows } = book;
      if (borrows[0].returned) {
        partArray[1].push(book);
        return partArray;
      } else {
        partArray[0].push(book);
        return partArray;
      }
    },
    [[], []]
  );
}

function getBorrowersForBook(book, accounts) {
  let returnableAccounts = [];

  const matchingAcctList = accounts.reduce((matchingAccounts, account) => {
    if (book.borrows.some(({ id }) => id == account.id)) {
      matchingAccounts.push(account);
    }
    return matchingAccounts;
  }, []);

  for (let account of matchingAcctList) {
    const matchingAccount = account;
    // console.log(matchingAccount);
    const { id } = matchingAccount;

    const { returned } = idSet;

    if (id === idSet.id) {
      idSet = {
        ...matchingAccount,
        returned,
      };
    }
  }
}

// function getBorrowersForBook(book, accounts) {
//   const borrowerAccounts = accounts.reduce((borrowerList, account) => {
//     borrowerList[account.id] = account;
//     return borrowerList;
//   }, {});

//   console.log(
//     book.borrows
//       .map(({ id, returned }) => ({
//         ...foo[id],
//         returned,
//       }))
//       .slice(0, 10)
//   );
// }

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
