import React from "react";
import { Input } from "@/components/ui/input.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { Button } from "@/components/ui/button.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label.jsx";
import { Card } from "@/components/ui/card.jsx";
import { Check, Info, NotebookPen } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import api from "@/Api/axios";
import { POSTS, USERS } from "@/Api/api";
import { toast } from "sonner";
import { postSchema } from "@/validation/post.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const CreatePost = () => {
    const queryClient = useQueryClient();

  //  React Hook Form 
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      body: "",
      userId: "",
    },
  });

  // Fetch users
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

  //  Submit handler
const createPostMutation = useMutation({
  mutationFn:async (data) => {
    const res = await api.post(`/${POSTS}`, data); 
    return res.data;
  },
  
    onSuccess: () => {
      toast.success("A new post has been successfully created!", {
        icon: <Check className="w-5 h-5 text-green-400" />,
      });
      queryClient.invalidateQueries(["posts"]); 
      console.log("success")
    },
    onError: (error) => {
      toast.error("Failed to create post");
      console.error(error);
    },
}
);
const onSubmit = (data) => {
    
  createPostMutation.mutate(data);
};
  
  
  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError)
    return <div className="text-center py-10">Error fetching users</div>;

  return (
    <div className="w-full max-w-[1200px] lg:w-[1200px]">
      <Card className="bg-white/85 shadow-xl w-full max-w-[1200px] lg:h-[901px]">
        {/* Header */}
        <div className="px-6 py-4 border-b bg-white rounded-xl">
          <div className="flex items-center gap-3">
            <NotebookPen className="w-6 h-6 text-gray-700" />
            <h1 className="text-xl font-semibold text-gray-900">
              Create a New Post
            </h1>
          </div>
        </div>

        {/* Form */}
        <div className="p-[24px] lg:h-[837px] lg:w-[896px]">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white rounded-2xl p-8 shadow-sm space-y-6 lg:h-[770px] lg:w-[896px]">
              {/* Title */}
              <div className="space-y-2">
                <Label
                  htmlFor="title"
                  className="text-sm font-semibold text-gray-900"
                >
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter post title"
                  {...register("title")}
                  className="bg-gray-100 border-0 h-12 rounded-xl placeholder:text-gray-400"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1 flex items-center text-[14px] ">
                    <Info width={"16px"} height={"16px"} />
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Body */}
              <div className="space-y-2">
                <Label
                  htmlFor="body"
                  className="text-sm font-semibold text-gray-900"
                >
                  Body
                </Label>
                <Textarea
                  id="body"
                  placeholder="Enter post body"
                  {...register("body")}
                  className="bg-gray-100 border-0 min-h-[120px] rounded-xl placeholder:text-gray-400 resize-none"
                />
                {errors.body && (
                  <p className="text-red-500 text-sm mt-1 flex items-center text-[14px]">
                    <Info width={"16px"} height={"16px"} />
                    {errors.body.message}
                  </p>
                )}
              </div>

              {/* Author */}
              <div className="space-y-2">
                <Label
                  htmlFor="author"
                  className="text-sm font-semibold text-gray-900"
                >
                  Author
                </Label>
                <Select
                  onValueChange={(value) =>
                    setValue("userId", value, { shouldValidate: true })
                  }
                >
                  <SelectTrigger className="bg-gray-100 border-0 h-12 rounded-xl text-gray-900 lg:w-[832px]">
                    <SelectValue placeholder="Select Author" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={String(user.id)}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.userId && (
                  <p className="text-red-500 text-sm mt-1 flex items-center text-[14px]">
                    <Info width={"16px"} height={"16px"} />
                    {errors.userId.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <div className="flex justify-end lg:w-[832px]">
                <Button
                  type="submit"
                  className="h-12 bg-gray-800 hover:bg-gray-900 text-white rounded-xl font-medium text-base mt-4 lg:w-[407px] lg:h-[51px]"
                >
                  Create Post
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default CreatePost;
