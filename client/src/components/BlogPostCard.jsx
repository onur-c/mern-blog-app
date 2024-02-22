const BlogPostCard = () => {
  return (
    <div className="flex gap-3 rounded-md shadow bg-purple-50">
      <img
        src="../assets/placeholder.jpg"
        alt="Photo of article"
        className="w-[500px] h-[200px] rounded-full"
      />
      <div className="flex flex-col justify-center gap-2">
        <h2>Article Title</h2>
        <p className="text-xs opacity-50">Yazar:Onur Çelik, 2024-01-05 15:15</p>
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
          expedita error provident a, dolores qui! Veritatis veniam cupiditate
          natus, possimus doloremque, magni dolorem quia, pariatur est
          repudiandae optio voluptatibus? Minima!
        </p>
      </div>
    </div>
  );
};

export default BlogPostCard;
