import { showErrorToast } from "../components/toasts";

let restApiUrl = "http://localhost:8080/api/";


export function resolveAPIUrl(path, query) {
  let p = restApiUrl + path;
  let qs = "";
  if (typeof query == "object" && query) qs = "?" + urlEncode(query);
  return p + qs;
}

const defaultOptions = {};

export function GET(url, hints, text) {
  return doFetch(
    url,
    {
      ...defaultOptions,
      headers: {
        Accept: "application/json"
      }
    },
    hints
  ).then(x => {
    try {
      if (text) return x.text();
      return x.json();
    } catch (e) { return e; }
  })
}

export async function doFetch(path, opt = {}, hints = {}) {

  let options = {
    method: 'GET',
    ...opt
  };

  try {
    return await fetch(resolveAPIUrl(path, opt && opt.query), options);
  }
  catch (e) {

    if (!e.response) {
      e.message = "Unable to connect to the server. Please check your Internet connection and try again.";
    }
    throw e;
  }
}

export function POST(url, data, hints) {
  return doFetch(url, {
    ...defaultOptions,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*'
    },
    body: JSON.stringify(data, null, 2)
  }, hints)
    .then(x => x.text());

}

export async function login(data, store) {
  var user = await doFetch('user/login', {
    ...defaultOptions,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*'
    },
    body: JSON.stringify(data, null, 2)
  })
    .then(x => {
      try {
        return x.json();
      } catch (e) { return x; }
    })
    .catch(err => {
      console.log("error")
      throw new Error('Failed to login. Please check if you entered valid username and password.');
    });

  return user;
}

export function PUT(url, data, hints) {
  return doFetch(
    url,
    {
      ...defaultOptions,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Accept': "application/json"
      },
      body: JSON.stringify(data, null, 2)
    },
    hints
  ).then(x => x.text());
}

export function DELETE(url, hints) {
  try {
    return doFetch(
      url,
      {
        ...defaultOptions,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Accept': "application/json"
        }
      },
      hints
    ).then(x => {
      if (!x.ok) showErrorToast("Deletion is not possible.")
      else return x.text();
    });
  } catch (e) {
    console.log(e)
  }
}
export function urlEncode(params) {
  return Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&');
}