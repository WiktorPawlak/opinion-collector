import React, { useState } from "react";
import "./LogIn.css";

function getBase64(file) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    console.log(reader.result);
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
}

function LogIn() {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const APP_KEY = "6d207e02198a847aa98d0a2a901485a5";
  const changeHandler = (event) => {
    //setSelectedFile(event.target.files[0]);
    //setIsFilePicked(true);
  };

  const handleSubmission = (event) => {
    const formData = new FormData();
    formData.append("File", selectedFile);
    var file = setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
    getBase64(file);

    fetch(`https://freeimage.host/api/1/upload?key=${APP_KEY}`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="container">
      <div className="sign-up">
        <div className="form-container">
          <form className="sign-up-form">
            <label>Email</label>
            <input type="text" />
            <label>Username</label>
            <input type="text" />
            <label>Password</label>
            <input type="file" name="file" onChange={changeHandler} />
            {isFilePicked ? (
              <div>
                <p>Filename: {selectedFile.name}</p>
                <p>Filetype: {selectedFile.type}</p>
                <p>Size in bytes: {selectedFile.size}</p>
                <p>
                  lastModifiedDate:{" "}
                  {selectedFile.lastModifiedDate.toLocaleDateString()}
                </p>
              </div>
            ) : (
              <p>Select a file to show details</p>
            )}
            <button
              onClick={handleSubmission}
              className="search-btn"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
