import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import Loading from "../components/Loading";
import { fetchPhotos } from "../components/ApiFunctions";

function AllImagesPage() {
  const [photos, setPhotos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(18);

  useEffect(() => {
    fetchImages();
  }, [page, searchQuery, perPage]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const data = await fetchPhotos(page, perPage, searchQuery);
      setPhotos(data.photos);
      setTotalPages(Math.ceil(data.total_results / perPage));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(1);
    fetchImages();
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
          <div className="row">
            {photos.map((photo) => (
              <div key={photo.id} className="col-md-4 mb-4">
                <Link
                  to={{
                    pathname: `/ImageDetails/${photo.id}`,

                    search: `?query=${searchQuery}`,
                  }}
                  style={{ textDecoration: "none" }}
                  className="text-dark"
                >
                  <div className="card">
                    <img
                      src={photo.src.medium}
                      alt={photo.photographer}
                      className="card-img-top"
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
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
                style={{ marginBottom: "0" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllImagesPage;
