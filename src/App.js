import React from "react";
import { Route, Routes } from "react-router-dom";
import "./style.css";
import ImageGallery from "./pages/imageGallery";
import SingleImageDetails from "./pages/singleImageDetails";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ImageGallery />} />
      <Route
        path="/single-image-details/:id"
        element={<SingleImageDetails />}
      />
    </Routes>
  );
};

export default App;
