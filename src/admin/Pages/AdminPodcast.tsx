import { useState } from "react";
import useDB from "../../hooks/useDB";

type PodcastData = {
  _id?: string;
  headline: string;
  info: string;
  length: number;
  podcast: string;
  thumbnail: string;
  releaseDate?: string;
  thumbnailFile?: File;
};

const AdminPodcast: React.FC = () => {
  const { data, loading, error, del } = useDB<PodcastData[]>("podcast", "podcast/admin");
  
  const [editPodcast, setEditPodcast] = useState<string | null>(null);
  const [newPodcast, setNewPodcast] = useState<PodcastData>({
    headline: "",
    info: "",
    length: 0,
    podcast: "",
    thumbnail: "",
    releaseDate: new Date().toISOString(),
  });

  const submitPodcast = async () => {
    if (!newPodcast.podcast) return alert("Mangler fil-sti");
    if (!newPodcast.releaseDate) return alert("Hvornår er podcasten fra???");

    const formData = new FormData();
    formData.append("headline", newPodcast.headline);
    formData.append("info", newPodcast.info);
    formData.append("length", newPodcast.length.toString());
    formData.append("releaseDate", newPodcast.releaseDate);
    formData.append("podcast", newPodcast.podcast);

    if (newPodcast.thumbnailFile) {
      formData.append("thumbnail", newPodcast.thumbnailFile);
    }

    try {
      const url = editPodcast
        ? `http://localhost:3001/podcast/admin/${editPodcast}`
        : "http://localhost:3001/podcast/admin";
      const method = editPodcast ? "PUT" : "POST";

      const res = await fetch(url, { method, body: formData });
      const result = await res.json();
      console.log("Upload result:", result);

      setEditPodcast(null);
      setNewPodcast({
        headline: "",
        info: "",
        length: 0,
        podcast: "",
        thumbnail: "",
        releaseDate: new Date().toISOString(),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const startEditing = (podcast: PodcastData) => {
    setEditPodcast(podcast._id || null);
    setNewPodcast({ ...podcast, thumbnailFile: undefined });
  };

  const deletePodcast = async (id: string) => {
    try {
      await del(id);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="mt-4 text-center">Loading...</p>;
  if (error) return <p className="mt-4 text-center text-red-600">{error.message}</p>;

  return (
    <div className="max-w-5xl p-6 mx-auto">
      <h2 className="mb-6 text-3xl font-bold text-center">Podcast Admin Panel</h2>

      <div className="p-6 mb-6 bg-white border">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            type="text"
            className="w-full p-2 border"
            placeholder="Headline"
            value={newPodcast.headline}
            onChange={(e) => setNewPodcast({ ...newPodcast, headline: e.target.value })}
          />
          <input
            type="text"
            className="w-full p-2 border"
            placeholder="Info"
            value={newPodcast.info}
            onChange={(e) => setNewPodcast({ ...newPodcast, info: e.target.value })}
          />
          <input
            type="number"
            className="w-full p-2 border"
            placeholder="Length (minutes)"
            value={newPodcast.length}
            onChange={(e) => setNewPodcast({ ...newPodcast, length: Number(e.target.value) })}
          />
          <input
            type="date"
            className="w-full p-2 border"
            value={newPodcast.releaseDate?.split("T")[0] || ""}
            onChange={(e) => setNewPodcast({ ...newPodcast, releaseDate: e.target.value })}
          />
          <input
            type="text"
            className="w-full p-2 border"
            placeholder="podcast_1.mp3"
            value={newPodcast.podcast}
            onChange={(e) => setNewPodcast({ ...newPodcast, podcast: e.target.value })}
          />
        <div className="mt-4">
          <label className="block mb-2 font-medium">Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 border"
            onChange={(e) =>
              e.target.files &&
              setNewPodcast({ ...newPodcast, thumbnailFile: e.target.files[0] })
            }
          />
        </div>

          {newPodcast.thumbnailFile && (
            <img
              src={URL.createObjectURL(newPodcast.thumbnailFile)}
              alt="Thumbnail Preview"
              className="w-32 mt-2 rounded shadow-sm"
            />
          )}
          {!newPodcast.thumbnailFile && newPodcast.thumbnail && (
            <img
              src={`http://localhost:3001/assets/podcast/${newPodcast.thumbnail}`}
              alt="Thumbnail"
              className="w-32 mt-2 border"
            />
          )}
        </div>

        <div className="flex gap-2 mt-4">
          <button className="px-4 py-2 text-white bg-blue-600 rounded"
            onClick={submitPodcast}
          >
            {editPodcast ? "Update" : "POST"}
          </button>
          {editPodcast && (
            <button className="px-4 py-2 text-white bg-gray-400 rounded"
              onClick={() => {
                setEditPodcast(null);
                setNewPodcast({
                  headline: "",
                  info: "",
                  length: 0,
                  podcast: "",
                  thumbnail: "",
                  releaseDate: new Date().toISOString(),
                });
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <ul className="space-y-4">
        {data?.map((podcast) => (
          <li
            key={podcast._id}
            className="flex flex-col items-start gap-4 p-4 bg-white border"
          >
            <div className="flex items-center gap-4">
              {podcast.thumbnail && (
                <img
                  src={`http://localhost:3001/assets/podcast/${podcast.thumbnail}`}
                  alt="Thumbnail"
                  className="max-w-[100px]"
                />
              )}
              <div>
                <h3 className="font-semibold">{podcast.headline}</h3>
                <p className="text-gray-600">{podcast.info}</p>
                <p className="text-sm text-gray-500">{podcast.length} min</p>
                {podcast.podcast && (
                  <p className="text-sm text-gray-500">MP3: {podcast.podcast}</p>
                )}
              </div>
            </div>

            <div className="flex gap-2 mt-2">
              <button
                className="px-3 py-1 text-white bg-green-600"
                onClick={() => startEditing(podcast)}
              >
                Edit
              </button>
              <button
                className="px-3 py-1 text-white bg-red-600"
                onClick={() => deletePodcast(podcast._id!)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPodcast;
