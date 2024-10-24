import "./Pagination.css";

interface Props {
  countriesPerPage: number;
  totalCountries: number;
  paginate: (page: number) => void;
  currentPage: number;
  pageNumbers: number[];
}

const Pagination = ({
  countriesPerPage,
  totalCountries,
  paginate,
  currentPage,
  pageNumbers,
}: Props) => {
  return (
    <div className="btn-container">
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={currentPage === number ? "btn-active" : "btn"}
          onClick={() => paginate(number)}
        >
          {number}
        </button>
      ))}
    </div>
  );
};
export default Pagination;
