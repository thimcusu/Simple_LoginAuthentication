import React from "react";
import PropTypes from "prop-types";

import { listPagination } from "../utils/userUtil";

function Pagination({ onChangePage = () => {}, currentPage = 1, count = 1 }) {
  if (count === 1) return <></>;
  const isOverLay = count > 7;
  const isRight = count - currentPage < 4;
  const isLeft = currentPage - 1 < 4;
  const isMiddle = !isRight && !isLeft;
  const pageNumbers = listPagination(
    isOverLay,
    isLeft,
    isRight,
    isMiddle,
    currentPage,
    count
  );

  return (
    <div>
      <nav aria-label="User Navigation">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? `disabled` : ""}`}>
            <button
              className="page-link"
              name={`${currentPage - 1}`}
              onClick={onChangePage}
            >
              Prev
            </button>
          </li>
          <li className={`page-item ${currentPage === 1 ? `active` : ""}`}>
            <button className="page-link" name={`${1}`} onClick={onChangePage}>
              1{currentPage === 1 && <span className="sr-only">(current)</span>}
            </button>
          </li>
          {!isLeft && (
            <li className="page-item disabled" key="more-previous">
              <button className="page-link">
                ...
                <span className="sr-only">(current)</span>
              </button>
            </li>
          )}
          {pageNumbers.map((pageNumber) => {
            let isActived = pageNumber === currentPage;
            return (
              <li
                className={`page-item ${isActived ? "active" : ""}`}
                key={`page${pageNumber}`}
              >
                <button
                  className="page-link"
                  name={`${pageNumber}`}
                  onClick={onChangePage}
                >
                  {pageNumber}
                  {isActived && <span className="sr-only">(current)</span>}
                </button>
              </li>
            );
          })}
          {!isRight && (
            <li className="page-item disabled" key="more-next">
              <button className="page-link">
                ...
                <span className="sr-only">(current)</span>
              </button>
            </li>
          )}
          <li className={`page-item ${currentPage === count ? `active` : ""}`}>
            <button
              className="page-link"
              name={`${count}`}
              onClick={onChangePage}
            >
              {count}
              {currentPage === count && (
                <span className="sr-only">(current)</span>
              )}
            </button>
          </li>
          <li
            className={`page-item ${currentPage === count ? `disabled` : ""}`}
          >
            <button
              className="page-link"
              name={`${currentPage + 1}`}
              onClick={onChangePage}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
Pagination.propTypes = {
  onChangePage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  count: PropTypes.number,
};

export default Pagination;
