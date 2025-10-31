import { useParams } from 'react-router'
import useDB from '../hooks/useDB'
import calcTime from '../hooks/calcTime';
import SenesteNews from '../components/PageComponents/SenesteNews';
import {type Article} from './Landingpage';
import PodcastComponent from '../components/PageComponents/PodcastComponent';

const Subpage = () => {

  const { slug } = useParams();
  const { data, loading, error } = useDB<Article>(`article/slug/${slug}`);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>Her er ikke nogen artikel</p>

  return (
    <section>
      {data && <>
      <h1>{data.title}</h1>
      <div className="category-time">
        <div className="news_category">{data.articleCategory}</div>
        <p>{calcTime(data.date)}</p>
      </div>
      <p className='article-sub_header2'>{data.content[0].text}</p>
      <img src={`http://localhost:3001/assets/images/${data.content[2].url}`} alt={data.content[2].altText} />
      <h3 className=''>{data.content[1].contentbody[0].headline}</h3>
      <p>{data.content[1].contentbody[0].text}</p>
      
      <h3>{data.content[1].contentbody[1].headline}</h3>
      <p>{data.content[1].contentbody[1].text}</p>
      
      <h3>{data.content[1].contentbody[2].headline}</h3>
      <p>{data.content[1].contentbody[2].text}</p>

      <SenesteNews endpoint='article' />

      <PodcastComponent />
      </>
      }

    </section>
  )
}

export default Subpage