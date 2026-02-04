
import React, { useState } from "react";
import { Card } from "./ui/card";
import { Plus, ScrollText, Search } from "lucide-react";
import { Field } from "./ui/field.jsx";
import { Input } from "./ui/input.jsx";
import { NativeSelect, NativeSelectOption } from "./ui/native-select";
import { Label } from "./ui/label.jsx";
import Post from "./Post.jsx";

import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { USERS } from "@/Api/api";
import api from "@/Api/axios";

const Posts = () => {
  const [search, setSearch] = useState("");
  const [authorId, setAuthorId] = useState("");

  const {
    data: users = [],
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await api.get(`${USERS}`);
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError)
    return <div className="text-center py-10">Error fetching users</div>;

  return (
    <div className="w-full max-w-[1200px] min-h-[901px] bg-gray-50/90 rounded-2xl mx-auto ">
      {/* Header */}
      <div className="h-[64px] flex justify-between items-center rounded-t-2xl px-4 bg-white">
        <div className="flex items-center gap-2">
          <ScrollText size="30px" strokeWidth="2px" />
          <p className="font-semibold text-[20px]">Post List</p>
        </div>

        <Link to="/newpost" className="flex items-center gap-1 cursor-pointer">
          <Plus width="18px" height="18px" strokeWidth="2px" />
          <p className="font-normal text-[16px]">Create new post</p>
        </Link>
      </div>

      {/* Search Section */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-20 items-stretch lg:items-center bg-[#0000001A] px-4 py-[18px] ">
        <Field
          orientation="horizontal"
          className="flex items-center flex-1 max-w-[909px] h-[51px] bg-white rounded-4xl px-3"
        >
          <Search className="text-gray-500 shrink-0" />
          <Input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 h-full border-none px-2"
          />
        </Field>
        <div className="flex items-center gap-2 ">
          <Label htmlFor="author">Author:</Label>
          <NativeSelect
            id="author"
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            className="bg-white"
          >
            <NativeSelectOption value="">Select Author</NativeSelectOption>
            {users.map((user) => (
              <NativeSelectOption key={user.id} value={String(user.id)}>
                {user.name}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>
      </div>

      {/* Post List */}
      <div className="lg:h-[670px] mb-[12px]">
        <Post search={search} authorId={authorId} />
      </div>
    </div>
  );
};

export default Posts;
