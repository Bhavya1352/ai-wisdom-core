import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search as SearchIcon, MessageSquare, Brain } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import ChatBox from "@/components/ChatBox";
import Navbar from "@/components/Navbar";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSearchResults([
        { id: 1, title: "AI Fundamentals", content: "Introduction to artificial intelligence...", score: 0.95 },
        { id: 2, title: "Machine Learning Basics", content: "Understanding ML algorithms...", score: 0.87 },
        { id: 3, title: "Neural Networks", content: "Deep learning and neural networks...", score: 0.82 }
      ]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="animate-fade-in text-center mb-8">
          <h1 className="gradient-text mb-2">Search & Ask</h1>
          <p className="text-muted-foreground text-lg">
            Find information and ask questions about your knowledge base
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6 animate-slide-up">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SearchIcon className="h-5 w-5" />
                  Semantic Search
                </CardTitle>
                <CardDescription>
                  Search through your documents using AI-powered semantic understanding
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SearchBar onSearch={handleSearch} isLoading={isLoading} />
                
                <div className="mt-6 space-y-4">
                  {searchResults.map((result) => (
                    <div key={result.id} className="p-4 bg-muted/30 rounded-lg">
                      <h3 className="font-semibold mb-2">{result.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{result.content}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-accent">Score: {result.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="animate-scale-in">
            <Card className="glass-card h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI Assistant
                </CardTitle>
                <CardDescription>
                  Ask questions and get intelligent answers from your knowledge base
                </CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <ChatBox />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;