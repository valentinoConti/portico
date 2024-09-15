import { InstagramIcon, WhatsappIcon } from "src/icons";
import "./styles.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div>
          <b>Portico Club.</b> Resistencia Chaco.
        </div>

        <div className="footer-container-socials">
          <a href="https://www.instagram.com/portico.club" target="_blank">
            <InstagramIcon />
          </a>
          <a href="https://wa.me/5493624207170" target="_blank">
            <WhatsappIcon />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
