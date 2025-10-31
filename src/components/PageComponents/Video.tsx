import useDB from "../../hooks/useDB";

type Video = {
  _id: string;
  title: string;
  url: string;
  description: string;
  duration: number;
  thumbnail: string;
}

const Video = () => {

  const { data, loading, error } = useDB<Video[]>("video");
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className="video">
      <h2>Video</h2>
      <div className="video_grid">
        <div className="video_grid-left">
          {data && data.slice(0, 3).map(video => {
            return <div key={video._id} className="grid-col-2">
              <video src={`http://localhost:3001/assets/video/${video.url}`} autoPlay={false} controls poster={`http://localhost:3001/assets/images/${video.thumbnail}`}></video>
              <div>
                <h2 className="article-sub_header2">{video.title}</h2>
                <p>{video.description}</p>
                {/* category / date findes ikke på video
                <div className="category-time">
                  <div className="news_category">{video.articleCategory}</div>
                  <p>{calcTime(video.date)}</p>
                </div> */}
              </div>
            </div>
          })}
        </div>

        <div className="video_grid-right">
          {data && 
          <>
            <video src={`http://localhost:3001/assets/video/${data[3].url}`} autoPlay={false} controls poster={`http://localhost:3001/assets/images/${data[3].thumbnail}`}></video>
            <h2>{data[3].title}</h2>
            <p>{data[3].description}</p>
          </>
          }
        </div>
      </div>
    </section>
  )
}

export default Video