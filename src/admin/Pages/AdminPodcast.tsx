import useDB from "../../hooks/useDB";
import { useState } from "react";

  type PodcastData = {
    _id?: string;
    headline: string;
    info: string;
    length: number;
    podcast: string;
    thumbnail: string;
    releaseDate?: string;
  }

const AdminPodcast: React.FC = () => {
  const { data, loading, error, post, put, patch, del } = useDB<PodcastData>("podcast", "podcast/admin"); /* GET, CRUD */
  const [newPodcast, setNewPodcast] = useState<PodcastData>({
    headline: "",
    info: "",
    length: 0,
    podcast: "",
    thumbnail: "",
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  const addPodcast = async () => {
    try {
      const response = await post(newPodcast);
      setNewPodcast({
        headline: "",
        info: "",
        length: 0,
        podcast: "",
        thumbnail: "",
      });
      console.log(response)

    } catch (error) {
      console.error("error", error);
    }
  };

  const updatePodcast = async (id: string) => {
    try {
      await put(id, newPodcast);
      setEditingId(null);
      setNewPodcast({ headline: "", info: "", length: 0, podcast: "", thumbnail: "" });
    } catch (err) {
      console.error(err);
    }
  };

  const deletePodcast = async (id: string) => {
    try {
      await del(id);
    } catch (err) {
      console.error(err);
    }
  };

   const startEditing = (podcast: PodcastData) => {
    setEditingId(podcast._id || null);
    setNewPodcast(podcast);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  return <>
          <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
                <h2>Admin Podcast</h2>

                {/* Form */}
                <div style={{ marginBottom: "20px" }}>
                  <input
                    placeholder="Headline"
                    value={newPodcast.headline}
                    onChange={(e) => setNewPodcast({ ...newPodcast, headline: e.target.value })}
                  />
                  <input
                    placeholder="Info"
                    value={newPodcast.info}
                    onChange={(e) => setNewPodcast({ ...newPodcast, info: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Length"
                    value={newPodcast.length}
                    onChange={(e) => setNewPodcast({ ...newPodcast, length: Number(e.target.value) })}
                  />
                  <input
                    placeholder="Podcast file"
                    value={newPodcast.podcast}
                    onChange={(e) => setNewPodcast({ ...newPodcast, podcast: e.target.value })}
                  />
                  <input
                    placeholder="Thumbnail"
                    value={newPodcast.thumbnail}
                    onChange={(e) => setNewPodcast({ ...newPodcast, thumbnail: e.target.value })}
                  />

                  <button onClick={() => (editingId ? updatePodcast(editingId) : addPodcast())}>
                    {editingId ? "Update Podcast" : "Add Podcast"}
                  </button>
                  {editingId && <button onClick={() => { setEditingId(null); setNewPodcast({ headline: "", info: "", length: 0, podcast: "", thumbnail: "" }); }}>Cancel</button>}
                </div>

                {/* List */}
                <ul>
                  {/* {data && data.map((podcast) => (
                    <li key={podcast._id} style={{ marginBottom: "10px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
                      <strong>{podcast.headline}</strong> - {podcast.length} min
                      <br />
                      <small>{podcast.info}</small>
                      <br />
                      <button onClick={() => startEditing(podcast)}>Edit</button>
                      <button onClick={() => deletePodcast(podcast._id!)}>Delete</button>
                    </li>
                  ))} */}
                </ul>
              </div>
  </>

}

export default AdminPodcast;