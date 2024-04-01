import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Loading from "../components/Loader";
import { getPhotos } from "../components/ApiCalling";

function ImageGallery() {
  const [photos, setPhotos] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(18);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [searchQuery, setSearchQuery] = useState(query || "cats");

  const fetchImages = async () => {
    setLoading(true);
    try {
      const data = await getPhotos(page, perPage, searchQuery);
      setPhotos(data.photos);
      setTotalPages(Math.ceil(data.total_results / perPage));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [page, perPage, searchQuery]);

  const handleSearch = () => {
    const trimmedSearchInput = searchInput.trim();
    setSearchQuery(trimmedSearchInput);
    setPage(1);
    if (trimmedSearchInput.length !== 0) {
      navigate(`/?query=${trimmedSearchInput}`);
    } else {
      navigate("/");
    }
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className="text-center bg-dark">
      <div className="container mt-0">
        <h1 className="text-white mb-3"> Search Image... </h1>
        <div className="input-group mb-4">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="form-control"
            placeholder="Search for images..."
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      <div className="container mt-3">
        {loading ? (
          <Loading />
        ) : (
          <>
            {photos.length === 0 ? (
              <h4 className="text-white ">No Images found....</h4>
            ) : (
              <div className="row">
                {photos.map((photo) => (
                  <div key={photo.id} className="col-md-4 mb-4">
                    <Link
                      to={{
                        pathname: `/SingleImageDetails/${photo.id}`,
                        search: `?query=${searchQuery}`,
                      }}
                      className="text-dark text-decoration-none"
                    >
                      <div className="card">
                        <img
                          src={photo.src.medium}
                          alt={photo.photographer}
                          className="card-img-top  card-img "
                        />
                        <div className="card-body ">
                          <p className="card-text ">
                            Photographer :{" "}
                            <span className="text-secondary">
                              {photo.photographer}
                            </span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {!loading && (
          <div className="container mt-0">
            <div className="row justify-content-end">
              <div className="col-md-5">
                <Pagination
                  activePage={page}
                  itemsCountPerPage={perPage}
                  totalItemsCount={totalPages * perPage}
                  pageRangeDisplayed={5}
                  onChange={handlePageChange}
                  itemClass="page-item"
                  linkClass="page-link"
                  prevPageText="Previous"
                  nextPageText="Next"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageGallery;
