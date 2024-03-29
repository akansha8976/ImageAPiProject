import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { fetchPhotoById } from "../components/ApiFunctions";

function ImageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [photo, setPhoto] = useState({});
  const [loading, setLoading] = useState(false);

  const searchParams = new URLSearchParams(window.location.search);
  const searchQuery = searchParams.get("query");
  console.log("=========searchQuery============", searchQuery);

  useEffect(() => {
    setLoading(true);
    const fetchPhoto = async () => {
      try {
        const data = await fetchPhotoById(id);
        setPhoto(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPhoto();
  }, [id]);

  const handleBackClick = () => {
    navigate(`/gallery?query=${searchQuery}`);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">Image Description</h1>
      <div className="row">
        <div className="col-7">
          {loading ? (
            <Loading />
          ) : (
            <img
              src={photo.src?.large}
              alt={photo.photographer}
              style={{
                width: "600px",
                height: "400px",
                objectFit: "cover",
              }}
            />
          )}
        </div>
        <div className="col-5">
          <div className="card-body">
            <h3 className="card-title">Photographer: {photo.photographer}</h3>
            <br />
            <p className="card-text">
              Attribute : <span className="text-secondary">{photo.alt}</span>{" "}
            </p>
            <p className="card-text">
              Height : <span className="text-secondary">{photo.height}</span>
            </p>
            <p className="card-text">
              Width : <span className="text-secondary">{photo.width}</span>
            </p>
            <p className="card-text">
              Id : <span className="text-secondary">{photo.id}</span>
            </p>
            <p className="card-text">
              Url :{" "}
              <span className="text-secondary">{photo.photographer_url}</span>
            </p>
            <p className="card-text">
              Mobile no :{" "}
              <span className="text-secondary">
                {photo.photographer_id + "9898"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="text-center mt-5">
        <button
          className="btn btn-dark text-white border rounded-pill px-5 py-3"
          onClick={handleBackClick}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default ImageDetails;
