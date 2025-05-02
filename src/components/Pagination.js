

function Pagination({ noOfPage, handleCurrentPage, currentPage }) {

  const handlePage = (n) => {
    handleCurrentPage(n);
  };

  return (
      <div>
        {[...Array(noOfPage).keys()].map((n) => (
          <span key={n} className={"page-number " + (n ===currentPage ? "active": " ")} onClick={() => handlePage(n)}>
            {n+1}
          </span>
        ))}
      </div>
  );
}

export default Pagination;
