import React, { useState, useEffect } from "react";
import "./styles.css";

const MemesGenerator = () => {
  const [text, setText] = useState({ topText: "", bottomText: "" });
  const [randomImg, setRandomImg] = useState("");
  const [allMemeImgs, setAllMemeImgs] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        const { memes } = response.data;
        setAllMemeImgs(memes);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const randIdx = Math.floor(Math.random() * allMemeImgs.length);
    const randMemeImg = allMemeImgs[randIdx].url;
    setRandomImg(randMemeImg);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setText((prevTextData) => ({ ...prevTextData, [name]: value }));
  };

  return (
    <div>
      <form className="meme-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="topText"
          placeholder="Top Text"
          value={text.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          name="bottomText"
          placeholder="Bottom Text"
          value={text.bottomText}
          onChange={handleChange}
        />

        <button>Gen</button>
      </form>
      <div className="meme">
        <img src={randomImg} alt="" />
        <h2 className="top">{text.topText}</h2>
        <h2 className="bottom">{text.bottomText}</h2>
      </div>
    </div>
  );
};

export default MemesGenerator;
