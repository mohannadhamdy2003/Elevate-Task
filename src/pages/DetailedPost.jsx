import { Button } from '@/Components/ui/button';
import { useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const DetailedPost = () => {
    const {id}=useParams()
    const navigate=useNavigate()
    const queryClient = useQueryClient();
    const [post, setPost] = useState(null);

    useEffect(() => {
      
      const cachedPosts = queryClient.getQueryData(["posts"]);

      if (cachedPosts) {
        const foundPost = cachedPosts.find((p) => p.id === parseInt(id));
        setPost(foundPost);
      }
    }, [id, queryClient]);

    if (!post) return <div>Loading...</div>;

   

  return (
    <div className="w-full max-w-[1200px] flex flex-col gap-4 lg:w-[1200px] lg:h-[901px]  ">
      <div className="bg-[#21609A]/80 backdrop-blur-md rounded-2xl overflow-hidden">
        <div className="px-6 sm:px-8 lg:h-[412px] flex flex-col justify-end gap-4 pb-6">
          <Button
            variant="ghost"
            className="self-start bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm rounded-full px-4 py-2 font-medium"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Posts
          </Button>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
            <div className="flex items-center gap-2">
              <User />
              <span>Leanne Graham</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar />
              <span>Sun, August 24th, 2025</span>
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm px-6 sm:px-8 py-8 lg:h-[412px]">
          <div className="prose max-w-none">
            <p className="text-gray-800 leading-relaxed text-base whitespace-pre-line">
              {post.body}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailedPost