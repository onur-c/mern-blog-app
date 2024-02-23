import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
      .then((res) => res.json())
      .then((post) => {
        setPost(post);
        setTitle(post?.title);
        setDescription(post?.description);
        setContent(post?.content);
      });
  }, [id]);

  const [post, setPost] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [uploadedImg, setUploadedImg] = useState(null);

  const [error, setError] = useState("Content must be over 50 characters");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.set("author", post.author);
    formData.set("title", title);
    formData.set("description", description);
    if (uploadedImg) {
      formData.set("uploadedImg", uploadedImg);
    }
    formData.set("content", content);

    const res = await fetch("http://localhost:4000/post", {
      method: "PUT",
      body: formData,
      credentials: "include",
    });

    if (res.status == 200) {
      navigate(`/post/${id}`);
    } else {
      setError("An error occured during updating the article.");
    }
  };

  return (
    <form
      className="flex flex-col m-auto gap-3 w-[300px] sm:w-[600px] lg:w-[920px]"
      onSubmit={handleSubmit}
    >
      <h1 className="text-xl font-semibold">Update your article</h1>
      <label className="flex flex-col gap-1">
        Title
        <input
          type="text"
          required
          className="p-2 rounded bg-black/5"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </label>
      <label className="flex flex-col gap-1">
        Description
        <input
          type="text"
          required
          className="p-2 rounded bg-black/5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label className="flex flex-col gap-1">
        Image
        <input
          type="file"
          required
          className="p-2 rounded bg-black/5"
          onChange={(e) => {
            if (e.target.files[0].size > 2097152) {
              setError("Image is larger than 2 MB.");
              setUploadedImg(null);
              return;
            } else {
              setUploadedImg(e.target.files[0]);
              setError(null);
            }
          }}
        />
        {uploadedImg && (
          <img
            src={URL.createObjectURL(uploadedImg)}
            className="md:max-w-[600px] md:max-h-[400px] max-w-[300px] max-h-[200px] mx-auto"
          />
        )}
      </label>

      <div className="w-full m-auto space-y-2">
        <p>Content</p>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={(value) => {
            setContent(value);
            if (content.length > 50) setError("");
          }}
          modules={modules}
          formats={formats}
        />
      </div>
      <p className="text-sm font-bold text-red-600 opacity-70 ">{error}</p>
      <Button variant={"primary"}>Update Article</Button>
    </form>
  );
};

export default EditPage;
