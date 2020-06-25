const url = "http://localhost:4000/api/v1";
const headers = {
  "Content-Type": "application/json",
};
export async function postFetch(data,urlApi) {
  try {
    const response = await fetch(`${url}/${urlApi}`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    return await response.json()
  } catch (err) {
    return false;
  }
}
export async function putFetch(data,urlApi) {
  try {
    const response = await fetch(`${url}/${urlApi}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });
    return await response.json()
  } catch (err) {
    return err;
  }
}
export async function getFetch(urlApi) {
  try {
    const response = await fetch(`${url}/${urlApi}`);
    return await response.json()
  } catch (err) {
    return err;
  }
}
export async function delateFetch(urlApi) {
  try {
    const response = await fetch(`${url}/${urlApi}`,{method: "DELETE",});
    return await response.json()
  } catch (err) {
    return err;
  }
}
