import useDB from '../../hooks/useDB';

type Video = {
  _id: string,
  title: string,
  url: string,
  description: string,
  duration: number,
  thumbnail: string,
}

const VejrVideo = () => {
  const { data, loading, error } = useDB<Video[]>(`video`);
  if (loading) return <div>Henter vejrdata…</div>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className='vejr_video'>
        <h2>Video</h2>
          {data &&
            <div className='vejr_video-container'>
              <div>
                <video src={`http://localhost:3001/assets/video/${data[0].url}`} autoPlay={false} controls poster={`http://localhost:3001/assets/images/weather_5.jpg`}></video>
                <h2>{data[0].title}</h2>
                <p>{data[0].description}</p>
                <div className="category-time">
                  <div className="news_category">Vejr</div>
                  <p>2 dage siden</p>
                </div>
              </div>
              <div className='vejr_video-video_container'>
                <video src={`http://localhost:3001/assets/video/${data[1].url}`} autoPlay={false} controls poster={`http://localhost:3001/assets/images/weather_5.jpg`}></video>
                <h2>{data[1].title}</h2>
                <p>{data[1].description}</p>
                <div className="category-time">
                  <div className="news_category">Vejr</div>
                  <p>2 dage siden</p>
                </div>
              </div>
            
            </div>
          }
      </div>
  )
}

export default VejrVideo