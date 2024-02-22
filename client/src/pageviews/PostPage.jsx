import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import profileImgUrl from "../public/profile-placeholder.jpg";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => setPost(data));
  }, [id]);

  return (
    <main>
      {!post ? (
        "Could not find a post with given id."
      ) : (
        <article className="flex flex-col items-center justify-center gap-2 ">
          <h1 className="text-3xl font-semibold">{post.title}</h1>
          <p className="text-xs">Created at {post.createdAt.split("T")[0]}</p>
          <div className="flex items-center gap-2 text-xs opacity-70">
            Written by
            <img
              className="object-cover rounded-full size-7"
              src={profileImgUrl}
            />
            <p>{post.author}</p>
          </div>
          <img
            src={`http://localhost:4000/${post.image}`}
            alt={post.title}
            className="object-cover"
          />

          <p className="text-sm ">{post.description}</p>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      )}
    </main>
  );
};

export default PostPage;
