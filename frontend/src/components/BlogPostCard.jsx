import { Link } from "react-router-dom";

const BlogPostCard = ({ post }) => {
  return (
    <Link to={`/post/${post._id}`}>
      <div className="flex flex-wrap justify-center gap-8 p-4 rounded-md max-w-[600px] shadow-md hover:shadow-lg transition ">
        <div className="w-[250px] h-[250px]">
          <img
            src={"/" + post.image}
            alt="Photo of article"
            className="object-cover overflow-hidden rounded aspect-square"
          />
        </div>
        <div className="flex flex-col justify-center w-[250px] gap-2">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-xs opacity-50">Author: {post.author}</p>
          <p className="text-xs opacity-50">
            Created at {post.createdAt.split("T")[0]}
          </p>

          <p className="text-sm text-balance line-clamp-3">
            {post.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BlogPostCard;
