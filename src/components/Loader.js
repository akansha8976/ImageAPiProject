import React from "react";

function Loading() {
  return (
    <div class="d-flex justify-content-center">
      <div class="spinner-border text-warning" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;
