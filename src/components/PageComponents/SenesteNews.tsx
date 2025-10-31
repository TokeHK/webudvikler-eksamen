import useDB from '../../hooks/useDB';
import { Link } from 'react-router';
import calcTime from '../../hooks/calcTime';

type Article = {
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
  type: string; /* 'paragraph' | 'main' | 'image' | 'link' */
  text?: string;
  headline?: string;
  url?: string;
  altText?: string;
  caption?: string;
  thumbnail?: string;
};

type SenesteNewsProps = {
  endpoint: string;
};

export default function SenesteNews({endpoint}: SenesteNewsProps) {

  const { data, loading, error } = useDB<Article[]>(`${endpoint}`);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const articles = data ?? [];/* tomt array så typescript ikke bliver sur over null data */

  const newestFour = [...articles]/* ...data */
    .filter(article => article.date && !isNaN(new Date(article.date).getTime()))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

return (
    <aside className='seneste_news'>
      <div className='vis_mere-header_container'>
        <h2 className='seneste_h'>Seneste</h2>
        <Link to={""} className='vis_mere'>Vis mere →</Link>
      </div>
      <div className='seneste_list'>
        {newestFour.map((article, index) => {
          const contentImage = article.content[2];
          if (!contentImage || contentImage.type !== 'image') {
            return null;
          }
          
          return (
            <Link to={`/artikel/${article.slug}`} key={article._id}>
              <div>
                <img 
                  src={`http://localhost:3001/assets/images/${contentImage.url}`} 
                  alt={contentImage.altText || 'Image'} 
                />
                <h3 className='seneste_article_h'>{article.title}</h3>
                <div className="category-time">
                  <div className="news_category">{article.articleCategory}</div>
                  <p>{calcTime(article.date)}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}