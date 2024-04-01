import React from "react";
import { Route, Routes } from "react-router-dom";
import "./Style.css";
import ImageGallery from "./pages/ImageGallery";

import SingleImageDetails from "./pages/SingleImageDetails";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ImageGallery />}></Route>

        <Route
          path="/SingleImageDetails/:id"
          element={<SingleImageDetails />}
        ></Route>
      </Routes>
    </>
  );
};

export default App;
