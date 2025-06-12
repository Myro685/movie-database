const API_URL = "http://localhost:3000";

const fetchData = (url, requestOptions) => {
  const apiUrl = `${API_URL}${url}`;

  return fetch(apiUrl, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Network response was not ok: ${response.status} ${response.statusText}`
        );
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

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

export const apiPost = (url, data) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetchData(url, requestOptions);
};

export const apiPut = (url, data) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetchData(url, requestOptions);
};

export const apiDelete = (url) => {
  const requestOptions = {
    method: "DELETE",
  };

  return fetchData(url, requestOptions);
};
