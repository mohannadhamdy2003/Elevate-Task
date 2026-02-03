import { POSTS } from "@/Api/api";
import api from "@/Api/axios";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const Post = ({ search = "", authorId = "" }) => {
  const [page, setPage] = useState(1);
  const postsPerPage = 12;

  const {
    data: posts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await api.get(`/${POSTS}`);
      return res.data;
    },
  });

  const filtered = posts.filter((post) => {
    const matchSearch = post.title.toLowerCase().includes(search.toLowerCase());
    const matchAuthor = authorId ? String(post.userId) === authorId : true;
    return matchSearch && matchAuthor;
  });

  useEffect(() => {
    setPage(1);
  }, [search, authorId]);

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError)
    return <div className="text-center py-10">Error fetching posts</div>;

  const start = (page - 1) * postsPerPage;
  const end = start + postsPerPage;
  const currentPosts = filtered.slice(start, end);

  return (
    <div className="flex flex-col min-h-[670px] lg:min-h-[700px] w-full">
      {/* Posts list */}
      <div className="flex-1 flex flex-col items-center w-full px-2 sm:px-4 md:px-6 lg:px-8">
        {currentPosts.length > 0 ? (
          currentPosts.map((post, index) => (
            <Link
              to={`${post.id}`}
              key={post.id || index}
              className="w-full lg:w-[1200px] px-4 py-4 border-b border-gray-400 text-sm sm:text-base md:text-[16px] cursor-pointer hover:bg-white/50 transition-colors duration-200"
            >
              {post.title}
            </Link>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">No posts found</div>
        )}
      </div>

      
      <div className="w-full flex-shrink-0 ">
        <Footer
          className={"mt-4 "}
          currentPage={page}
          totalPages={Math.ceil(filtered.length / postsPerPage)}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
};

export default Post;
