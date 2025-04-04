import React, { useRef, useState } from "react";
import "./HeadshotDuck.css";

import duckImage from "../assets/duck.jpg";
import headshotImage from "../assets/me.jpg";
import quackSound from "../assets/quack.mp3";
import flySound from "../assets/ducks-flying-away.mp3";

const HeadshotDuck = () => {
  const [clicked, setClicked] = useState(false);
  const [typedText, setTypedText] = useState("");

  const [typing, setTyping] = useState(false);

  const duckRef = useRef(null);
  const nameRef = useRef(null);
  const wrapperRef = useRef(null);

  const name = "Yulia";

  const handleClick = () => {
    if (clicked) return;
    setClicked(true);

    wrapperRef.current.classList.add("active");

    const headshot = document.getElementById("headshot");
    const duck = duckRef.current;

    headshot.style.opacity = 0;
    headshot.style.pointerEvents = "none";
    headshot.style.animation = "none";

    duck.style.opacity = 1;

    const flying = new Audio(flySound);
    flying.currentTime = 5;
    flying.play();

    playQuack(3, 250);

    setTimeout(() => {
      document.getElementById("nameBox").style.opacity = 1;
      typeName(name);
    }, 500);

    setTimeout(() => {
      duck.style.animation = "runAway 2.5s ease-in-out forwards";
    }, 1200);
  };

  const typeName = (text) => {
    if (typing) return;
    setTyping(true);
    let i = 0;
    let current = ""; 

    const interval = setInterval(() => {
      if (i < text.length) {
        current += text[i]; 
        setTypedText(current); 
        i++;
      } else {
        clearInterval(interval);
        nameRef.current.classList.add("vibrate");
        setTyping(false);
      }
    }, 200);
  };

  const playQuack = (times = 3, delay = 250) => {
    for (let i = 0; i < times; i++) {
      setTimeout(() => {
        const quack = new Audio(quackSound); 
        quack.play();
      }, i * delay);
    }
  };

  return (
    <div className="wrapper" ref={wrapperRef}>
      <div className="head-wrapper">
        <img
          id="headshot"
          src={headshotImage}
          alt="Headshot"
          onClick={handleClick}
        />
        <img id="duck" src={duckImage} alt="Duck" ref={duckRef} />
      </div>

      <div className="name-box" id="nameBox">
        <a
          ref={nameRef}
          href="https://yukascreations.com/" 
          target="_blank"
          rel="noopener noreferrer"
        >
          {typedText}
        </a>
      </div>
    </div>
  );
};

export default HeadshotDuck;
