import { useEffect, useState } from "react";
import BlogPostCard from "./BlogPostCard";

const BlogPostList = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);
  console.log(posts);
  return (
    <section className="flex flex-wrap items-center justify-center gap-12 ">
      {/* {new Array(6).fill("1").map((a, i) => {
        return <BlogPostCard key={a + i} />;
      })} */}
      {!posts.length ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => <BlogPostCard key={post._id} post={post} />)
      )}
    </section>
  );
};

export default BlogPostList;
