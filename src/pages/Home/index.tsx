import React, { useEffect } from "react";
import porticoVertical from "src/assets/porticoVertical.webm";
import porticoVerticalMp4 from "src/assets/porticoVertical.mp4";
import porticoHorizontal from "src/assets/porticoHorizontal.webm";
import porticoHorizontalMp4 from "src/assets/porticoHorizontal.mp4";
import { useWindowSize } from "src/utils/useWindowSize";
import { useNavigate } from "react-router-dom";
import "./styles.scss";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { height, width } = useWindowSize();
  const isHorizontal = width > height;

  useEffect(() => {
    const goStore = setTimeout(() => {
      navigate("/store");
    }, 5000);

    return () => {
      clearTimeout(goStore);
    };
  }, []);

  return (
    <div className="home">
      <div className="video-background">
        <div className="video-background-container">
          <video
            autoPlay
            muted
            playsInline={true}
            onEnded={() => {
              navigate("/store");
            }}
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
            Loading...
          </video>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
