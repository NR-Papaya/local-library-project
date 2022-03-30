function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const returnedBooks = books.filter(({ borrows }) => borrows[0].returned);
  const notReturnedBooks = books.filter(({ borrows }) => !borrows[0].returned);
  return [notReturnedBooks, returnedBooks];
}
//helper function
function _findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}
//---
function getBorrowersForBook(book, accounts) {
  const { borrows } = book;

  const updatedBorrowsList = borrows.map((borrower) => {
    const currentAccount = _findAccountById(accounts, borrower.id);
    if (currentAccount) {
      borrower = { ...borrower, ...currentAccount };
      return borrower;
    } else {
      return;
    }
  });

  return updatedBorrowsList.slice(0, 10);
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
