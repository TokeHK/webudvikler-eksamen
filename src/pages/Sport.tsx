import SenesteNews from "../components/PageComponents/SenesteNews";
import useDB from "../hooks/useDB"
import { Link } from "react-router";
import calcTime from "../hooks/calcTime";
import Video from "../components/PageComponents/Video";
import type { Article } from "./Landingpage";

export default function Sport() {
  const { data, loading, error } = useDB<Article[]>("article/section/sport");
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <>
    {
      data && 
      <section className="landing_header sport">
        <h1>{data[0].title}</h1>
        <div className="category-time">
          <div className="news_category">{data[0].articleCategory}</div>
          <p>{calcTime(data[0].date)}</p>
        </div>
        <div className="news_hero">
          <Link to={`/artikel/${data[0].slug}`} id={data[0]._id}>
            <img src={`http://localhost:3001/assets/images/${data[0].content[2].url}`} alt={data[0].content[2].altText} />
          </Link>
          
          <div className="news_hero-side">
            <Link to={`/artikel/${data[1].slug}`} id={data[1]._id} className="news_card">
              <div className="news_card-col">
                <h2 className="article-sub_header2">{data[1].title}</h2>
                <p>{data[1].content[0].text}</p>
                <div className="category-time">
                  <div className="news_category">{data[1].articleCategory}</div>
                  <p>{calcTime(data[1].date)}</p>
                </div>
              </div>
              <img src={`http://localhost:3001/assets/images/${data[1].content[2].url}`} alt={data[1].content[2].altText} />
            </Link>
            <Link to={`/artikel/${data[2].slug}`} id={data[2]._id} className="news_card">
              <div className="news_card-col">
                <h2 className="article-sub_header2">{data[2].title}</h2>
                <p>{data[2].content[0].text}</p>
                <div className="category-time">
                  <div className="news_category">{data[2].articleCategory}</div>
                  <p>{calcTime(data[2].date)}</p>
                </div>
              </div>
              <img src={`http://localhost:3001/assets/images/${data[2].content[2].url}`} alt={data[2].content[2].altText} />
            </Link>
          </div>
        </div>
        
        <div className='podcast_page-hero '>
          <img src={`http://localhost:3001/assets/images/${data[3].content[2].url}`} alt={data[3].content[2].altText} />
          <div className='podcast_page-info'>
            <p>Lorem ipsum dolor sit amet.</p>
            <div className="category-time">
                <div className="news_category">{data[2].articleCategory}</div>
                <p>{calcTime(data[2].date)}</p>
              </div>
          </div>
        </div>

        <SenesteNews endpoint={"article/section/sport"}/>

        <Video thumbnail1="cycling_1.jpg" thumbnail2="cycling_2.jpg" />
      </section>
    }
  </>
}
