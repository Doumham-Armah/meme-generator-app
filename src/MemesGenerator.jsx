import React, { useState, useEffect } from "react";
import "./styles.css";

const MemesGenerator = () => {
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [randomImg, setRandomImg] = useState("");
  const [allMemeImgs, setAllMemeImgs] = useState([]);

  useEffect(() => {
    console.log("inside component did mount");

    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        const { memes } = response.data;
        setAllMemeImgs(memes);
        console.log(memes.length);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const randIdx = Math.floor(Math.random() * allMemeImgs.length);
    const randMemeImg = allMemeImgs[randIdx].url;
    setRandomImg(randMemeImg);
  };

  return (
    <div>
      <form className="meme-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="topText"
          placeholder="Top Text"
          value={topText}
          onChange={(e) => setTopText(e.target.value)}
        />
        <input
          type="text"
          name="bottomText"
          placeholder="Bottom Text"
          value={bottomText}
          onChange={(e) => setBottomText(e.target.value)}
        />

        <button>Gen</button>
      </form>
      <div className="meme">
        <img src={randomImg} alt="" />
        <h2 className="top">{topText}</h2>
        <h2 className="bottom">{bottomText}</h2>
      </div>
      {/* {console.log(allMemeImgs[0])} */}
    </div>
  );
};

export default MemesGenerator;
