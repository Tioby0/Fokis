import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { insertPostSchema, type InsertPost } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Editor() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertPost>({
    resolver: zodResolver(insertPostSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "devlopman",
      slug: "",
      authorId: "admin", // We'll update this with actual Firebase user ID
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertPost) => {
      await apiRequest("POST", "/api/posts", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/posts'] });
      toast({
        title: "Success",
        description: "Post created successfully"
      });
      navigate("/admin/dashboard");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  return (
    <div className="min-h-screen bg-[#121212] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 font-poppins">Kreye Nouvo Atik</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Tit</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      className="bg-black/30 border-gray-700 text-white"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Slug (URL)</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      className="bg-black/30 border-gray-700 text-white"
                      placeholder="your-article-title"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Kategori</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-black/30 border-gray-700 text-white">
                        <SelectValue placeholder="Chwazi yon kategori" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-[#121212] border-gray-700">
                      <SelectItem value="devlopman">Devlopman Pèsonèl</SelectItem>
                      <SelectItem value="peyi">Sitiyasyon Peyi</SelectItem>
                      <SelectItem value="espirityalite">Espirityalite</SelectItem>
                      <SelectItem value="ekonomi">Ekonomi</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Kontni</FormLabel>
                  <FormControl>
                    <textarea 
                      {...field}
                      className="w-full min-h-[400px] p-4 rounded-md bg-black/30 border border-gray-700 text-white font-open-sans"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/dashboard")}
                className="border-[#D0A64B] text-[#D0A64B]"
              >
                Anile
              </Button>
              <Button 
                type="submit" 
                disabled={mutation.isPending}
                className="bg-[#D0A64B] hover:bg-[#D0A64B]/90 text-black"
              >
                {mutation.isPending ? "Ap Anrejistre..." : "Anrejistre"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}