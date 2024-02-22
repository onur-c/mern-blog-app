import BlogPostCard from "./BlogPostCard";

const BlogPostList = () => {
  return (
    <section className="flex flex-col gap-12 ">
      {new Array(6).fill("1").map((a, i) => {
        return <BlogPostCard key={a + i} />;
      })}
    </section>
  );
};

export default BlogPostList;
