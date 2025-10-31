import useDB from '../hooks/useDB';
import type { PodcastData } from '../components/PageComponents/PodcastComponent';
import PodcastCard from '../components/PageComponents/PodcastCard';

const Podcast = () => {
  const { data, loading, error } = useDB<PodcastData[]>("podcast");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className='podcast'>
      <div className='podcast_page-hero'>
        <img src="http://localhost:3001/assets/images/podcast_1.jpg" alt="Dude talking into a mic" />
        <p className='podcast_page-info'>Lorem ipsum dolor sit amet.</p>
      </div>
      {data?.map((podcast) => (
        <div className='podcast_page-cards' key={podcast._id}>
          <PodcastCard key={podcast._id} podcast={podcast} />
          <div className='podcast_page-cards_info'>
            <div>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident, eum?</p>
              <br />
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, aperiam corporis nihil quo placeat ad.</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

export default Podcast