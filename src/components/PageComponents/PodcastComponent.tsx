import useDB from "../../hooks/useDB";
import PodcastCard from "./PodcastCard";
import { useRef } from "react";
import { Link } from "react-router";

export type PodcastData = {
  _id: string;
  headline: string;
  info: string;
  length: number;
  podcast: string;
  thumbnail: string;
  releaseDate: string;
};

export default function PodcastComponent() {
  const { data, loading, error } = useDB<PodcastData[]>("podcast");

  const slider = useRef<HTMLDivElement | null>(null);

  const slide = (direction: "left" | "right") => {
  if (!slider.current) return;

  let cardWidth = 700;
  const gap = 16;

  if (window.innerWidth <= 425) {
    cardWidth = 325;
  } else if (window.innerWidth <= 768) {
    cardWidth = 500;
  }

  const scrollAmount = direction === "left" ? -(cardWidth + gap) : (cardWidth + gap);
  slider.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
};

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section>
      <div className="vis_mere-header_container">
        <h2 className="podcast_h">Podcast</h2>
        <Link to={"podcast"} className='vis_mere'>Vis mere →</Link>
      </div>

      <div className="podcast_slider-wrapper">
        
        <div className="podcast_slider" ref={slider}>
          {data?.map((podcast) => (
            <PodcastCard key={podcast._id} podcast={podcast} />
          ))}
        </div>

        <div className="podcast_slider-btn_container">
          <button className="podcast-btn_border" onClick={() => slide("left")}>&lt;</button>{/* < */}
          <button className="podcast-btn_border" onClick={() => slide("right")}>&gt;</button>{/* > */}
        </div>
      </div>
    </section>
  );
}