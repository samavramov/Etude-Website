import { Cookies } from "react-cookie";

async function useFetch(url, params) {
  const cookies = new Cookies();
  const auth= cookies.get("auth");
  if (auth) {
    const cred = auth.credential;
    console.log("auth cookie in client: " + cred);
    if (!params.headers) params.headers = {};
    params.headers["Authorization"] = "Bearer " + cred;
  }


  return fetch(url, params)
    .then((response) => response.json())
    .then((data) => {
      if (data.redirect) {
        document.location.href = data.redirect;
      }
      return data;
    })
    .catch((err) => {
      if (err && err.status === 401) {
        document.location.href = "/login";
      }
    });
}

export async function GetAllGymnasts() {
  return useFetch("http://localhost:8000/gymnasts", { method: "GET" });
}

export async function GetGymnast(gymnastId) {
  return useFetch("http://localhost:8000/gymnasts/" + gymnastId, {
    method: "GET",
  });
}

export async function DeleteGymnast(gymnastId) {
  return useFetch("http://localhost:8000/gymnasts/" + gymnastId, {
    method: "DELETE",
  });
}

export async function CreateGymnast(gymnast) {
  const params = {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(gymnast),
  };
  return useFetch("http://localhost:8000/gymnasts", params);
}

export async function UpdateGymnast(gymnast) {
  const params = {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(gymnast),
  };
  return useFetch("http://localhost:8000/gymnasts/" + gymnast.id, params);
}
