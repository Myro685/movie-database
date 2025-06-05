const API_URL = "http://localhost:3000";

export const apiGet = (url, par) => {
  const queryParams = new URLSearchParams(par);
  const apiUrl = `${API_URL}${url}?${queryParams}`;

  return fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Network response was not ok: ${response.status} ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
};
