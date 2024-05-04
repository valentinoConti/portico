import React, { useState } from "react";
import favicon from "../../favicon.png";
import porticoVertical from "../../assets/porticoVertical.webm";
import porticoVerticalMp4 from "../../assets/porticoVertical.mp4";
import porticoHorizontal from "../../assets/porticoHorizontal.webm";
import porticoHorizontalMp4 from "../../assets/porticoHorizontal.mp4";
import "./styles.scss";
import { useWindowSize } from "src/utils/useWindowSize";

const HomePage: React.FC = () => {
  const { height, width } = useWindowSize();
  const isHorizontal = width > height;

  return (
    <div className="home">
      <div className="video-background">
        <div className="video-background-container">
          <video
            autoPlay
            muted
            loop
            playsInline={true}
            key={isHorizontal ? "HH" : "VV"}
          >
            <source
              src={isHorizontal ? porticoHorizontal : porticoVertical}
              type="video/webm"
            />
            <source
              src={isHorizontal ? porticoHorizontalMp4 : porticoVerticalMp4}
              type="video/mp4"
            />
            NOT SUPPORT
          </video>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
