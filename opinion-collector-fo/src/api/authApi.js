const loginCredentials = {
  username: "user",
  password: "user",
};

const registerDto = {
  email: "siema@siemdadaaa.com",
  login: "stringdawdaddaa",
  hashedPass: "string"
}

export function login() {
    console.log(JSON.stringify(loginCredentials))
  fetch(`//localhost:8080/client/self`, {
    headers: {
      'Content-Type': 'application/json',
      "Accept": 'application/json'
    },
    credentials: "include",
    method: "GET",
   // body: JSON.stringify(loginCredentials),
  })
    .then((response) => response.json)
    .then((result) => {
      console.log("Success:", result);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
