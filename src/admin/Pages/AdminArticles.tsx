import React, { useEffect, useState } from "react";
import useDB from "../../hooks/useDB";

type AdminArticle = {
  _id?: string;
  title: string;
  content: ContentItem[];
  publishedAt?: number;
  section: string;
  slug?: string;
  articleCategory?: string;
  isLandingpage: boolean;
  tags: string[] | string;
  author: string;
  date?: string;
};

type ContentItem = {
  _id?: string;
  type: string;
  text?: string;
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
};

const AdminArticles: React.FC = () => {
  const { data, loading, error, post, put, del } = useDB<AdminArticle[]>("article", "article/admin");
  const { data: sections } = useDB<{ _id: string; name: string; description: string }[]>("article/section");

  const [articles, setArticles] = useState<AdminArticle[]>([]);
  const [newArticle, setNewArticle] = useState<AdminArticle>({
    title: "",
    content: [],
    section: "",
    articleCategory: "",
    isLandingpage: false,
    tags: [],
    author: "",
  });

  useEffect(() => {
    if (data) setArticles(data);
  }, [data]);

  // POST
  const addArticle = async () => {
    try {
      await post(newArticle);
      setNewArticle({
        title: "",
        content: [],
        section: "",
        articleCategory: "",
        isLandingpage: false,
        tags: [],
        author: "",
      });
    } catch (err) {
      console.error("Error creating article:", err);
    }
  };

  // PUT
  const updateArticle = async (article: AdminArticle) => {
    if (!article._id) return;
    await put(article._id, article);
  };

  // DELETE
  const deleteArticle = async (article: AdminArticle) => {
    if (!article._id) return;
    await del(article._id);
  };

  const toggleLandingPage = (article: AdminArticle) => {
    const updated = { ...article, isLandingpage: !article.isLandingpage };
    updateArticle(updated);
  };/* sender ...article med i PUT da PATCH ikke findes */

  const handleChange = (id: string, field: keyof AdminArticle, value: any) => {
    setArticles((prev) =>
      prev.map((a) => (a._id === id ? { ...a, [field]: value } : a))
    );
  };

  const addContentItem = (article: AdminArticle | "new") => {
    const newItem: ContentItem = {
      type: "paragraph",
      text: "",
      contentbody: [],
    };
    if (article === "new") {
      setNewArticle({
        ...newArticle,
        content: [...newArticle.content, newItem],
      });
    } else {
      const updated = [...articles];
      const index = updated.findIndex((a) => a._id === article._id);
      updated[index].content.push(newItem);
      setArticles(updated);
    }
  };/* til content: [type: "paragraph", text: ""] */

  //nested content item til main
  const addContentBodyItem = (article: AdminArticle, contentIndex: number) => {
    const updated = [...article.content];
    if (!updated[contentIndex].contentbody) updated[contentIndex].contentbody = [];
    updated[contentIndex].contentbody.push({ type: "paragraph", text: "", headline: "" });
    handleChange(article._id!, "content", updated);
  };/* contentbody: [type: "paragraph", text: "", headline: ""] */

  if (loading) return <p>Loading articles…</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className="max-w-5xl p-6 mx-auto">
      <div className="bg-white border p-2 min-h-[400px]">
        <h2 className="mb-6 text-3xl font-bold text-center">Article Admin Panel</h2>
        <p>Der skal være mindst 5 landingpage articles / 5 bliver vist</p>


        {/* TITLE */}
        <input
          type="text"
          placeholder="Title"
          value={newArticle.title}
          onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
          className="w-full px-3 py-2 mb-2 border"
        />

        {/* SELECT KATEGORI */}
        <select
          value={newArticle.section}
          onChange={(e) => {
            const sectionId = e.target.value;
            const section = sections?.find((s) => s._id === sectionId);
            setNewArticle({
              ...newArticle,
              section: sectionId,
              articleCategory: section?.name || "",
            });
          }}
          className="w-full px-3 py-2 mb-2 border"
        >
          <option value="">Category (+ section)</option>
          {sections?.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>
        

        {/* ARTIKEL AUTHOR */}
        <input
          type="text"
          placeholder="Author"
          value={newArticle.author}
          onChange={(e) => setNewArticle({ ...newArticle, author: e.target.value })}
          className="w-full px-3 py-2 mb-2 border"
        />


        {/* ARTIKEL TAGS */}
        <input
          type="text"
          placeholder="Tags 'tag1, tag2, tag3' "
          value={Array.isArray(newArticle.tags) ? newArticle.tags.join(", ") : newArticle.tags}
          onChange={(e) =>
            setNewArticle({
              ...newArticle,
              tags: e.target.value.split(",").map((t) => t.trim()),
            })
          }
          className="w-full px-3 py-2 mb-2 border"
        />


        {/* CONTENT ITEMS = content: [], API layer 2 */}
        <h3 className="mt-4 mb-2">Content Items</h3>
        {newArticle.content.map((contentItem, index) => (
          <div key={index} className="p-4 mb-2">
            <select
              value={contentItem.type}
              onChange={(e) => {
                const updated = [...newArticle.content];
                updated[index].type = e.target.value;
                setNewArticle({ ...newArticle, content: updated });
              }}
              className="w-full px-3 py-2 mb-2 border"
            >
              <option value="paragraph">Paragraph</option>
              <option value="image">Image</option>
              <option value="link">Link</option>
              <option value="video">Video</option>
              <option value="main">Main</option>
            </select>

            {/* IF content item er en specific type */}
            {contentItem.type === "image" && (
              <>
                <input
                  type="text"
                  placeholder="Image url"
                  value={contentItem.url || ""}
                  onChange={(e) => {
                    const updated = [...newArticle.content];
                    updated[index].url = e.target.value;
                    setNewArticle({ ...newArticle, content: updated });
                  }}
                  className="w-full px-3 py-2 mb-2 border"
                />

                <input
                  type="text"
                  placeholder="alt tekst"
                  value={contentItem.altText || ""}
                  onChange={(e) => {
                    const updated = [...newArticle.content];
                    updated[index].altText = e.target.value;
                    handleChange(newArticle._id!, "content", updated);
                  }}
                  className="w-full px-3 py-2 mb-2 border"
                />
              </>
            )}

            {/* Normal tekst */}
            <textarea
              placeholder="Text"
              value={contentItem.text || ""}
              onChange={(e) => {
                const updated = [...newArticle.content];
                updated[index].text = e.target.value;
                setNewArticle({ ...newArticle, content: updated });
              }}
              className="w-full px-3 py-2 mb-2 border"
            />

            {/* MAIN type får fat i contentbody: [], API layer 3*/}
            {contentItem.type === "main" &&
              contentItem.contentbody?.map((bodyItem, idx) => (
                <div key={idx} className="p-2 mb-2 ml-4 border-l">
                  <input
                    type="text"
                    placeholder="Headline"
                    value={bodyItem.headline || ""}
                    onChange={(e) => {
                      const updated = [...newArticle.content];
                      updated[index].contentbody![idx] = {
                        ...updated[index].contentbody![idx],
                        headline: e.target.value,
                      };
                      setNewArticle({ ...newArticle, content: updated });
                    }}
                    className="w-full px-2 py-1 mb-1 border"
                  />
                  <textarea
                    placeholder="Text"
                    value={bodyItem.text || ""}
                    onChange={(e) => {
                      const updated = [...newArticle.content];
                      updated[index].contentbody![idx] = {
                        ...updated[index].contentbody![idx],
                        text: e.target.value,
                      };
                      setNewArticle({ ...newArticle, content: updated });
                    }}
                    className="w-full px-2 py-1 mb-1 border"
                  />
                </div>
              ))}

            {contentItem.type === "main" && (
              <button
                type="button"
                onClick={() => addContentBodyItem(newArticle, index)}
                className="px-2 py-1 mt-1 border"
              >
                Tilføj "main" nested paragraph + headline
              </button>
            )}          
          </div>
        ))}
        {/* CONTENT ITEMS code end */}
        <button type="button" onClick={() => addContentItem("new")} className="px-3 py-2 mb-2 border">
          Add Content Item
        </button>

        <label className="flex items-center gap-2 mt-4">
          <input type="checkbox" checked={newArticle.isLandingpage} onChange={(e) => setNewArticle({ ...newArticle, isLandingpage: e.target.checked })}/>
          Landing Page
        </label>

        <button onClick={addArticle} className="px-8 py-2 mt-4 text-white bg-blue-600">
          Add Article
        </button>
      </div>
      {/* END POST article */}

      {/* EDIT articles - mapper igennem */}
      <h2 className="mb-4 text-2xl font-semibold">Edit Articles</h2>
      {articles.map((article, index) => (
        <div key={article._id} className="p-2 mb-20 bg-white border">
          Title, Category, Author, Tags
          {/* EDIT TITLE */}
          <input type="text" value={article.title} onChange={(e) => handleChange(article._id!, "title", e.target.value)}
            className="w-full px-3 py-2 mb-2 border" placeholder="Title"
          />
          {/* EDIT SELECT CAATEGORY */}
          <select value={article.articleCategory || ""} onChange={(e) => {
              const selectedCategory = e.target.value;
              const selectedSection = sections?.find((s) => s.name === selectedCategory);
              handleChange(article._id!, "articleCategory", selectedCategory);
              if (selectedSection) handleChange(article._id!, "section", selectedSection._id);
            }} className="w-full px-3 py-2 mb-2 border">
              <option value="">Select Section</option>
              {/* CATEGORY options fra article/section[].name */}
            {sections?.map((s) => (
              <option key={s._id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
          
          {/* EDIT AUTHOR */}
          <input type="text" value={article.author} onChange={(e) => handleChange(article._id!, "author", e.target.value)}
            className="w-full px-3 py-2 mb-2 border" placeholder="Author" />
          {/* EDIT TAGS */}
          <input type="text" value={Array.isArray(article.tags) ? article.tags.join(", ") : article.tags} 
            onChange={(e) =>
              handleChange( article._id!, "tags", e.target.value.split(",").map((t) => t.trim()))
            } className="w-full px-3 py-2 mb-2 border" placeholder="Tags"
          />

          {/* EDIT CONTENT ITEMS */}
          <h3 className="mt-2 mb-2">Content Items</h3>
          {article.content.map((contentItem, index) => (
            <div key={index} className="p-4 mb-2 border rounded-md">
              <select value={contentItem.type} onChange={(e) => {
                const updated = [...article.content];
                updated[index].type = e.target.value;
                handleChange(article._id!, "content", updated);
              }} className="w-full px-3 py-2 mb-2 border">
                <option value="paragraph">Paragraph</option>
                <option value="image">Image</option>
                <option value="link">Link</option>
                <option value="video">Video</option>
                <option value="main">Main</option>
              </select>
              
              {/* EDIT CONTENT TYPE */}
              {contentItem.type === "image" && (
                <>
                type, url, alt tekst
                <input type="text" placeholder="Image URL" value={contentItem.url || ""} onChange={(e) => {
                  const updated = [...article.content];
                  updated[index].url = e.target.value;
                  handleChange(article._id!, "content", updated);
                }} className="w-full px-3 py-2 mb-2 border" />
                <input type="text" placeholder="alt tekst" value={contentItem.altText || ""} onChange={(e) => {
                  const updated = [...article.content];
                  updated[index].altText = e.target.value;
                  handleChange(article._id!, "content", updated);
                }} className="w-full px-3 py-2 mb-2 border" />
                </>
              )}

              {/* EDIT TEXT layer 2 */}
              <textarea placeholder="Text" value={contentItem.text || ""} onChange={(e) => {
                const updated = [...article.content];
                updated[index].text = e.target.value;
                handleChange(article._id!, "content", updated);
              }} className="w-full px-3 py-2 mb-2 border" />
              {/* EDIT MAIN, ADD CONTENT ITEMS */}
              {contentItem.type === "main" &&
                contentItem.contentbody?.map((bodyItem, idx) => (
                  <div key={idx} className="p-2 mb-2 ml-4 border-l">
                    <input type="text" placeholder="Headline" value={bodyItem.headline || ""} onChange={(e) => {
                        const updated = [...article.content];
                        updated[index].contentbody![idx] = {
                          ...updated[index].contentbody![idx],
                          headline: e.target.value,
                        };
                        handleChange(article._id!, "content", updated);
                      }} className="w-full px-2 py-1 mb-1 border" />
                    <textarea placeholder="Text" value={bodyItem.text || ""} onChange={(e) => {
                      const updated = [...article.content];
                      updated[index].contentbody![idx] = {
                        ...updated[index].contentbody![idx],
                        text: e.target.value,
                      };
                      handleChange(article._id!, "content", updated);
                    }} className="w-full px-2 py-1 mb-1 border" />
                  </div>
                ))
              }

              {contentItem.type === "main" && (
                <button type="button" onClick={() => addContentBodyItem(article, index)} className="px-2 py-1 mt-1 border" >
                  Tilføj "main" nested paragraph + headline
                </button>
              )}
            </div>
          ))}
          {/* EDIT ADD CONTENT ITEM */}
          <button type="button" onClick={() => addContentItem(article)} className="px-3 py-2 mb-2 border">
            Add Content Item
          </button>
          {/* EDIT TOGGLE LANDINGPAGE */}
          <label className="flex items-center gap-2 mb-2">
            <input type="checkbox" checked={article.isLandingpage} onChange={() => toggleLandingPage(article)} />
            Landing Page
          </label>
          
          {/* EDIT SAVE / DELETE ARTICLE */}
          <div className="flex gap-2">
            <button type="button" onClick={(e) => {
                updateArticle(article);
              }} className="px-3 py-2 text-white bg-green-600" >
              Save
            </button>
            <button type="button" onClick={(e) => {
              deleteArticle(article);
            }} className="px-3 py-2 text-white bg-red-600" >
              Delete
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default AdminArticles;
