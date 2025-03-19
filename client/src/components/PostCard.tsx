import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import type { Post } from "@shared/schema";
import { format } from "date-fns";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {post.imageUrl && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge>{post.category}</Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            {format(new Date(post.createdAt), 'dd MMM yyyy')}
          </div>
        </div>
        <CardTitle className="mt-2 font-poppins">{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3 font-open-sans">
          {post.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
        </p>
      </CardContent>
    </Card>
  );
}
