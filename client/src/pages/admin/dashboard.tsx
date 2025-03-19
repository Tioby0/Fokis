import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Image, MessageSquare, TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { Post } from "@shared/schema";

// Mock data for chart - replace with real data later
const visitData = [
  { date: "Mar 13", visits: 24 },
  { date: "Mar 14", visits: 35 },
  { date: "Mar 15", visits: 30 },
  { date: "Mar 16", visits: 45 },
  { date: "Mar 17", visits: 28 },
  { date: "Mar 18", visits: 50 },
  { date: "Mar 19", visits: 42 },
];

export default function Dashboard() {
  const { data: posts } = useQuery<Post[]>({
    queryKey: ['/api/posts']
  });

  return (
    <div className="min-h-screen bg-[#121212] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold font-poppins">Admin Dashboard</h1>
          <div className="flex gap-4">
            <Link href="/admin/editor">
              <Button className="bg-[#D0A64B] hover:bg-[#D0A64B]/90 text-black">
                <FileText className="mr-2 h-4 w-4" />
                Nouvo Atik
              </Button>
            </Link>
            <Button variant="outline" className="border-[#D0A64B] text-[#D0A64B]">
              <Image className="mr-2 h-4 w-4" />
              Galri Foto
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="bg-black/50 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">
                Atik Aktif
              </CardTitle>
              <FileText className="h-4 w-4 text-[#D0A64B]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{posts?.length || 0}</div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">
                Kòmantè Total
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-[#D0A64B]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">140</div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">
                Vizitè Jodi a
              </CardTitle>
              <Users className="h-4 w-4 text-[#D0A64B]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">
                Tandans
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-[#D0A64B]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">+12%</div>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <Card className="bg-black/50 border-gray-800 mb-8">
          <CardHeader>
            <CardTitle className="text-gray-200">Vizit pa Jou</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={visitData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="date" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#121212',
                      border: '1px solid #333'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="visits" 
                    stroke="#D0A64B" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Posts */}
        <Card className="bg-black/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-200">Dènye Atik yo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {posts?.slice(0, 5).map((post) => (
                <Card key={post.id} className="bg-black/30 border-gray-700">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base">{post.title}</CardTitle>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-red-500 hover:text-red-600"
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}