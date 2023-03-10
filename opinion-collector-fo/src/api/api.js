const BASE_URL = 'http://localhost:8080';

export async function get(stringUrl, params) {
  const url = new URL(stringUrl, BASE_URL);
  if (params) {
    url.search = new URLSearchParams(params).toString();
  }

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    credentials: 'include',
    method: 'GET'
  });

  if (response.ok) {
    return [await response.json(), response.status];
  } else {
    return [await response.text(), response.status];
  }
}

export async function getNoResponse(stringUrl, params) {
  const url = new URL(stringUrl, BASE_URL);
  if (params) {
    url.search = new URLSearchParams(params).toString();
  }

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    credentials: 'include',
    method: 'GET'
  });

  return response.status;
}

const defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};

export async function post(url, body, headers = defaultHeaders) {
  const response = await fetch(`${BASE_URL}${url}`, {
    headers,
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify(body)
  });

  if (response.ok) {
    return [await response.json(), response.status];
  } else {
    return [await response.text(), response.status];
  }
}

export async function remove(url, body, headers = defaultHeaders) {
  const response = await fetch(`${BASE_URL}${url}`, {
    headers,
    credentials: 'include',
    method: 'DELETE',
    body: JSON.stringify(body)
  });

  if (response.ok) {
    return [response.status];
  } else {
    return [response.status];
  }
}

export async function postNoResponse(url, body, headers = defaultHeaders) {
  const response = await fetch(`${BASE_URL}${url}`, {
    headers,
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify(body)
  });

  if (response.created) {
    return [response.status];
  } else {
    return [response.status];
  }
}

export async function putWithBody(url, body, headers = defaultHeaders) {
  const response = await fetch(`${BASE_URL}${url}`, {
    headers,
    credentials: 'include',
    method: 'PUT',
    body: JSON.stringify(body)
  });

  return response.status;
}

export async function putWithBodyS(url, body) {

  const response = await fetch(`${BASE_URL}${url}`, {
    credentials: 'include',
    method: 'PUT',
    body
  });

  return [await response.text(), response.status];
}

export async function put(stringUrl, params) {
  const url = new URL(stringUrl, BASE_URL);
  if (params) {
    url.search = new URLSearchParams(params).toString();
  }

  const response = await fetch(url, {
    // headers: {
    //   "Content-Type": "application/json",
    //   Accept: "application/json",
    // },
    credentials: 'include',
    method: 'PUT'
  });

  return [await response.text(), response.status];
}

export async function postMultipart(url, body) {
  const response = await fetch(`${BASE_URL}${url}`, {
    credentials: 'include',
    method: 'POST',
    body
  });

  if (response.ok) {
    return [await response.json(), response.status];
  } else {
    return [await response.text(), response.status];
  }
}

export async function putMultipart(url, body) {
  const response = await fetch(`${BASE_URL}${url}`, {
    credentials: 'include',
    method: 'PUT',
    body
  });

  if (response.ok) {
    return [await response.json(), response.status];
  } else {
    return [await response.text(), response.status];
  }
}
