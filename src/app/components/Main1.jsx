"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Fade, Slide } from "react-awesome-reveal";
import { useSpring, animated } from "react-spring";
import img from "../../../public/images/backpack.png";
const Main = () => {
  const [isDarkMode, toggle] = useState(false);

  const click = () => {
    if (!isDarkMode) {
      document.body.style.backgroundColor = "rgb(21, 20, 20)";
      document.body.style.color = "white";
    } else {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "";
    }
  };

  //*************************************************************************** */

  const properties = {
    sun: {
      r: 9,
      transform: "rotate(40deg)",
      cx: 12,
      cy: 4,
      opacity: 0,
    },
    moon: {
      r: 5,
      transform: "rotate(90deg)",
      cx: 30,
      cy: 0,
      opacity: 1,
    },
    springConfig: { mass: 4, tension: 250, friction: 35 },
  };
  const { r, transform, cx, cy, opacity } = isDarkMode
    ? properties["moon"]
    : properties["sun"];
  const svgContainerProps = useSpring({
    transform,
    config: properties.springConfig,
  });
  const centerCircleProps = useSpring({ r, config: properties.springConfig });
  const maskedCircleProps = useSpring({
    cx,
    cy,
    config: properties.springConfig,
  });
  const linesProps = useSpring({ opacity, config: properties.springConfig });

  return (
    <main className="landing  container">
      <div className="App" onClick={click}>
        <animated.svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          style={{ ...svgContainerProps, cursor: "pointer" }}
          onClick={() => toggle((prev) => !prev)}
        >
          <mask id="mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <animated.circle
              style={maskedCircleProps}
              cx="12"
              cy="4"
              r="9"
              fill="black"
            />
          </mask>
          <animated.circle
            style={centerCircleProps}
            fill="black"
            cx="12"
            cy="12"
            r="9"
            mask="url(#mask)"
          />

          <animated.g style={linesProps} fill="currentColor">
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </animated.g>
        </animated.svg>
      </div>
      <div className="main-text">
        <Fade delay={1e3} cascade damping={1e-1}>
          <h1>YOUR EVERYDAY ESSENTIALS DESERVE THE BEST.</h1>
        </Fade>
        <Fade delay={1e3} cascade damping={1e-1}>
          <div className="main-btn">
            <button>Shop Now</button>
            <button className="second-btn">Add to Cart</button>
          </div>
        </Fade>
      </div>
      <Slide direction="right">
        <div className="main-image">
          <Image src={img} alt="imag" className="bigimg" />
        </div>
      </Slide>
    </main>
  );
};

export default Main;
