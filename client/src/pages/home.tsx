import { useQuery } from "@tanstack/react-query";
import PostCard from "@/components/PostCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Post } from "@shared/schema";

export default function Home() {
  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ['/api/posts']
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 font-poppins">Fòk Se Kounya</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <ScrollArea className="h-[300px] rounded-md border p-4 mt-8">
        <div className="space-y-4">
          {/* Featured content or sidebar */}
        </div>
      </ScrollArea>
    </div>
  );
}
