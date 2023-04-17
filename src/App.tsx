import React, { useState } from "react";
import "./App.css";
import { useMediaQuery } from "react-responsive";

const App: React.FC = () => {
  const [caption, setCaption] = useState<string>("");
  const [imageUrl, setImageUrl] = useState('');

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const handleSubmit = () => {
    alert(`Caption: ${caption}`);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCaption(event.target.value);
  };

  const endpoint = 'https://zorkaihelper.azurewebsites.net/api/getImgURL';
  fetch(endpoint, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
      'Content-Type': 'application/json',
  }
  })
    .then((response) => response.json())
    .then((data) => setImageUrl(data.url))
    .then((data) => console.log(data))
    .catch((error) => console.log(error));

  return (
    <div className="App">
      <audio src="https://dreammachinesa.blob.core.windows.net/sounds/Feel-Good.mp3" autoPlay loop />
      <div className="center">
        <img
          src={imageUrl}
          alt="Your image"
          className={isMobile ? "image-mobile" : "image-desktop"}
        />
        <p>Some caption text</p>
        <input
          type="text"
          value={caption}
          onChange={handleChange}
          placeholder="Enter caption..."
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default App;
