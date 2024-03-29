export const apiKey =
  "mAsePZwxRPtnfmBHIWm29YvaVpT9oGyMr410Rlfd2wGAkR7eibYXhZv3";
// const fetchPhotos = async (page, perPage, searchQuery,apiKey) => {
const fetchPhotos = async (page, perPage, searchQuery) => {
  if (searchQuery.length === 0) {
    searchQuery = "cats";
  }
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?page=${page}&per_page=${perPage}&query=${searchQuery}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: ` ${apiKey}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch photos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// const fetchPhotoById = async (id, apiKey) => {
const fetchPhotoById = async (id) => {
  try {
    const response = await fetch(`https://api.pexels.com/v1/photos/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: ` ${apiKey}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch photo");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { fetchPhotos, fetchPhotoById };
