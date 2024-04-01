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
  const url = `https://api.pexels.com/v1/search?page=${page}&per_page=${perPage}&query=${searchQuery}`;
  return fetchData(url);
};

export const getPhotoById = async (id) => {
  const url = `https://api.pexels.com/v1/photos/${id}`;
  return fetchData(url);
};
