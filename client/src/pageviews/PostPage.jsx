import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import profileImgUrl from "../public/profile-placeholder.jpg";
import { UserContext } from "../context/UserContext";
import { Edit } from "lucide-react";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { userInfo } = useContext(UserContext);
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
          {userInfo?.username === post.author && (
            <div className="transition border border-solid cursor-pointer border-black/5 hover:border-black/50">
              <Link className="flex items-center p-2" to={`/edit/${post._id}`}>
                <Edit size={16} strokeWidth={1.25} /> Edit
              </Link>
            </div>
          )}
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
