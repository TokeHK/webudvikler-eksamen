import { Link } from "react-router";
import KontaktModal from "./PageComponents/KontaktModal";
import { useState } from "react";

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <footer className="footer">
      <div className="footer_grid">
        <div className="footer_grid-col">
          <h3 className="footer_grid-h">Nyheder</h3>
          <Link to={"nyheder"}>Seneste nyt</Link>
          <Link to={"#"}>Internationalt</Link>
          <Link to={"sport"}>Sport</Link>
          <Link to={"vejr"}>Vejret</Link>
        </div>
        <div className="footer_grid-col">
          <h3 className="footer_grid-h">Lorem, ipsum dolor.</h3>
          <button type="button" className="kontakt" onClick={openModal}>Kontakt os</button>
        </div>
        <div className="footer_grid-col">
          <h3 className="footer_grid-h">Lorem, ipsum dolor.</h3>
          <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus sed animi laboriosam et nulla, officia minus, voluptas in nesciunt consequuntur.</div>
        </div>
        <div className="footer_grid-col">
          <h3 className="footer_grid-h">Om NEWS</h3>
          <Link to={"nyheder"}>Nyt fra NEWS</Link>
          <Link to={"#"}>Job i NEWS</Link>
          <Link to={"#"}>Presse</Link>
          <Link to={"#"}>Vilkår på NEWs</Link>
          <Link to={"#"}>Etik og rettelser</Link>
          <Link to={"#"}>Privatlivspolitik</Link>
        </div>
      </div>
      <div className="footer_alt"><p>Lorem ipsum dolor sit amet, consectetur adipisicing. | TLF: <a href="tel:+4512345678">12 34 56 78</a></p></div>
      {isModalOpen && <KontaktModal onClose={closeModal} />}
    </footer>
  );
}
