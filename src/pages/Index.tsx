import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Search, Upload, BarChart3, Shield, Users, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Index = () => {
  const features = [
    {
      icon: Search,
      title: "Semantic Search",
      description: "AI-powered search that understands context and meaning",
    },
    {
      icon: Upload,
      title: "Easy Upload",
      description: "Drag and drop documents to build your knowledge base",
    },
    {
      icon: BarChart3,
      title: "Analytics",
      description: "Track usage and performance with detailed insights",
    },
    {
      icon: Sparkles,
      title: "Fast Processing",
      description: "Lightning-fast document processing and retrieval",
    },
    {
      icon: Shield,
      title: "Secure",
      description: "Enterprise-grade security for your sensitive data",
    },
    {
      icon: Users,
      title: "Collaborative",
      description: "Share knowledge and insights across your team",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/20 rounded-full animate-scale-in relative">
              <Zap className="h-16 w-16 text-primary" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full animate-pulse" />
            </div>
          </div>
          <h1 className="gradient-text mb-6">
            AI-Powered Knowledge Hub
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your documents into an intelligent knowledge base. Upload, search, and discover insights with the power of AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Button asChild size="lg" className="text-lg px-8">
              <Link to="/search">
                <Search className="mr-2 h-5 w-5" />
                Start Searching
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link to="/upload">
                <Upload className="mr-2 h-5 w-5" />
                Upload Documents
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="gradient-text mb-4">Powerful Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create, manage, and explore your AI-powered knowledge base
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className="glass-card hover:shadow-lg transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="p-3 bg-primary/10 rounded-full w-fit">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="glass-card text-center p-8 animate-fade-in">
          <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-lg text-muted-foreground mb-6">
            Upload your first document and experience the power of AI-driven knowledge management
          </p>
          <Button asChild size="lg" className="text-lg px-8">
            <Link to="/upload">
              Get Started Now
            </Link>
          </Button>
        </Card>
      </section>
    </div>
  );
};

export default Index;
