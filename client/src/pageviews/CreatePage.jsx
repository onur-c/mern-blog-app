import { useContext, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

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

const CreatePage = () => {
  const navigate = useNavigate();

  const { userInfo } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const [error, setError] = useState("Content must be over 50 characters");

  const [uploadedImg, setUploadedImg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.length < 50) {
      setError("Content must be over 50 characters");
      return;
    } else {
      setError("");
    }

    const formData = new FormData();

    formData.set("author", userInfo.username);
    formData.set("title", title);
    formData.set("description", description);
    formData.set("uploadedImg", uploadedImg);
    formData.set("content", content);

    const res = await fetch("http://localhost:4000/create", {
      method: "POST",
      body: formData,
    });
    if (res.status == 200) {
      console.log(await res.json());
      navigate("/");
    } else {
      console.log(await res.json());
    }
  };

  return (
    <form
      className="flex flex-col m-auto gap-3 w-[300px] sm:w-[600px] lg:w-[920px]"
      onSubmit={handleSubmit}
    >
      <h1 className="text-xl font-semibold">Create your article</h1>
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
      <Button variant={"primary"}>Create Article</Button>
    </form>
  );
};

export default CreatePage;
