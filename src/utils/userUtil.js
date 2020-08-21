export const listPagination = (
  isOverLay,
  isLeft,
  isRight,
  isMiddle,
  currentPage,
  count
) => {
  let pageNumbers = [];
  if (!isOverLay) {
    for (let i = 2; i <= count - 1; i++) {
      pageNumbers.push(i);
    }
  } else {
    if (isLeft) {
      for (let i = 2; i <= 5; i++) {
        pageNumbers.push(i);
      }
    }
    if (isRight) {
      for (let i = count - 4; i <= count - 1; i++) {
        pageNumbers.push(i);
      }
    }
    if (isMiddle) {
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageNumbers.push(i);
      }
    }
  }
  return pageNumbers;
};
