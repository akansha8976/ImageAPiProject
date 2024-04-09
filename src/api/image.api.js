export const apiKey =
  "mAsePZwxRPtnfmBHIWm29YvaVpT9oGyMr410Rlfd2wGAkR7eibYXhZv3";

const fetchData = async (url) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: ` ${apiKey}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getPhotos = async (page, perPage, searchQuery) => {
  const validateQuery = searchQuery.trim();

  if (!validateQuery) {
    throw new Error("Search query cannot be empty..");
  }

  const url = `https://api.pexels.com/v1/search?page=${page}&per_page=${perPage}&query=${encodeURIComponent(
    validateQuery
  )}`;

  return fetchData(url);
};

export const getPhotoById = async (id) => {
  if (!id || isNaN(id) || id <= 0) {
    throw new Error("Empty Id not allow");
  }
  const url = `https://api.pexels.com/v1/photos/${id}`;

  return fetchData(url);
};
