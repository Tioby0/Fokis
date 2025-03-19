import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import PostCard from "@/components/PostCard";
import type { Post } from "@shared/schema";

type SortOption = "recent" | "popular" | "shortest";

const categoryTitles: Record<string, string> = {
  devlopman: "Devlopman Pèsonèl",
  peyi: "Sitiyasyon Peyi",
  ekonomi: "Ekonomi",
  espirityalite: "Espirityalite"
};

export default function CategoryPage() {
  const [, params] = useRoute("/category/:category");
  const category = params?.category || "";
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("recent");

  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ['/api/posts', category],
  });

  const filteredAndSortedPosts = posts?.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "popular":
        return (b.views || 0) - (a.views || 0);
      case "shortest":
        return a.content.length - b.content.length;
      default:
        return 0;
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 font-poppins text-primary">
        {categoryTitles[category] || category}
      </h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Select
          value={sortBy}
          onValueChange={(value) => setSortBy(value as SortOption)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Triye pa" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Pi Resan</SelectItem>
            <SelectItem value="popular">Pi Popilè</SelectItem>
            <SelectItem value="shortest">Lekti Pi Kout</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="search"
          placeholder="Chèche nan kategori sa a..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedPosts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Pagination will be added here */}
    </div>
  );
}
