import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, FileText, Activity, TrendingUp, Database } from "lucide-react";
import Navbar from "@/components/Navbar";

const Dashboard = () => {
  const stats = [
    { title: "Total Documents", value: "1,284", icon: FileText, change: "+12%" },
    { title: "Active Users", value: "847", icon: Users, change: "+5%" },
    { title: "Searches Today", value: "2,341", icon: Activity, change: "+18%" },
    { title: "Knowledge Base Size", value: "45.2 GB", icon: Database, change: "+8%" }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="animate-fade-in mb-8">
          <h1 className="gradient-text mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Monitor your AI knowledge hub performance and usage
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={stat.title} className="glass-card animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="glass-card animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Usage Analytics
              </CardTitle>
              <CardDescription>
                Track user engagement and system performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                <p className="text-muted-foreground">Analytics Chart Placeholder</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest system activities and user interactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "Document uploaded", user: "john@example.com", time: "2 minutes ago" },
                  { action: "Search performed", user: "sarah@example.com", time: "5 minutes ago" },
                  { action: "User registered", user: "mike@example.com", time: "10 minutes ago" },
                  { action: "Document processed", user: "system", time: "15 minutes ago" }
                ].map((activity, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.user}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;