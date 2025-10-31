import SenesteNews from "../components/PageComponents/SenesteNews";
import useDB from "../hooks/useDB"
import { Link } from "react-router";
import calcTime from "../hooks/calcTime";
import Video from "../components/PageComponents/Video";
import PodcastComponent from "../components/PageComponents/PodcastComponent";
import QuizComponent from "../components/PageComponents/QuizComponent";

export type Article = {
  _id: string;
  title: string;
  content: ContentItem[];
  publishedAt: number;
  section: string;
  slug: string;
  articleCategory: string;
  isLandingpage: boolean;
  tags: string[] | string;
  author: string;
  date: string;
};

type ContentItem = {
  _id: string;
  type: string;
  text?: string;
  headline?: string;
  url?: string;
  altText?: string;
  caption?: string;
  thumbnail?: string;
  contentbody: ContentText[];
};

type ContentText = {
  type?: string;
  text?: string;
  headline?: string;
}
{/* Nogle artikler har ikke alle headlines/text */}

/* ... damn typescript */

export default function Landingpage() {
  const { data, loading, error } = useDB<Article[]>("article/landingpage");
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <>
    {
      data && <>
      <section className="landing_header">
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
          <Link to={`/artikel/${data[3].slug}`} className="news_card-alt">
            <img src={`http://localhost:3001/assets/images/${data[3].content[2].url}`} alt={data[3].content[2].altText} />
            <p>{data[3].content[0].text}</p>
          </Link>
          <Link to={`/artikel/${data[4].slug}`} className="news_card-alt">
            <img src={`http://localhost:3001/assets/images/${data[4].content[2].url}`} alt={data[4].content[2].altText} />
            <p>{data[4].content[0].text}</p>
          </Link>
        </div>
      </section>

      <SenesteNews endpoint={"article"} />

      <Video thumbnail1="political_1.jpg" thumbnail2="political_3.jpg"/>

      <PodcastComponent />

      <QuizComponent />
      </>
    }
    
  </>
}