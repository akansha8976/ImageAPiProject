import React from "react";
import { Route, Routes } from "react-router-dom";

import Gallery from "./pages/Gallery";
// import ImageDetails from "./pages/get/ImageDetails";
import ImageDetails from "./pages/ImageDetails";
const App = () => {
  return (
    <>
      {/* <Gallery /> */}

      <Routes>
        <Route path="*" element={<Gallery />}></Route>
        {/* <Route path="/image/:id" component={ImageDetails} /> */}
        <Route path="/ImageDetails/:id" element={<ImageDetails />}></Route>
      </Routes>
    </>
  );
};

export default App;
