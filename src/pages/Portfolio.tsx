import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/Logo";
import { WalletConnect } from "@/components/WalletConnect";
import { 
  ArrowLeft,
  PieChart,
  TrendingUp,
  Leaf,
  DollarSign,
  Globe,
  Users,
  Calendar,
  Target
} from "lucide-react";
import { Link } from "react-router-dom";

const Portfolio = () => {
  const portfolioInsights = [
    {
      category: "Solar Energy",
      allocation: "35%",
      value: "$1.47M",
      performance: "+14.2%",
      impact: "450 tCO₂ offset",
      status: "Active",
      isPositive: true
    },
    {
      category: "Wind Power", 
      allocation: "28%",
      value: "$1.18M",
      performance: "+9.8%",
      impact: "380 tCO₂ offset",
      status: "Active",
      isPositive: true
    },
    {
      category: "Carbon Credits",
      allocation: "████",
      value: "████████",
      performance: "████████",
      impact: "████████",
      status: "Encrypted",
      isPositive: false
    },
    {
      category: "Reforestation",
      allocation: "████",
      value: "████████", 
      performance: "████████",
      impact: "████████",
      status: "Encrypted",
      isPositive: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Logo showText={true} />
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  Portfolio Insights
                </h1>
                <p className="text-sm text-muted-foreground">
                  Detailed portfolio analysis and impact metrics
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <WalletConnect />
              <Link to="/dashboard">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold text-foreground">$4.2M</p>
                <p className="text-xs text-success mt-1">+10.3% overall</p>
              </div>
              <DollarSign className="w-8 h-8 text-accent" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Environmental Impact</p>
                <p className="text-2xl font-bold text-success">850 tCO₂</p>
                <p className="text-xs text-muted-foreground mt-1">Carbon offset</p>
              </div>
              <Leaf className="w-8 h-8 text-success" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Projects</p>
                <p className="text-2xl font-bold text-foreground">12</p>
                <p className="text-xs text-muted-foreground mt-1">Across 8 countries</p>
              </div>
              <Globe className="w-8 h-8 text-trust" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Diversification Score</p>
                <p className="text-2xl font-bold text-accent">8.7/10</p>
                <p className="text-xs text-muted-foreground mt-1">Optimal spread</p>
              </div>
              <Target className="w-8 h-8 text-accent" />
            </div>
          </Card>
        </div>

        {/* Portfolio Allocation */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Portfolio Allocation & Performance
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {portfolioInsights.map((item, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{item.category}</h3>
                    <Badge 
                      variant="outline" 
                      className={
                        item.status === "Active" 
                          ? "bg-success/10 text-success border-success/30"
                          : "bg-warning/10 text-warning border-warning/30"
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Allocation</p>
                    <p className="text-xl font-bold text-foreground">{item.allocation}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Value</p>
                    <p className="text-lg font-semibold text-foreground">{item.value}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Performance</p>
                    <p className={`text-lg font-semibold ${item.isPositive ? 'text-success' : 'text-muted-foreground'}`}>
                      {item.performance}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Environmental Impact</p>
                    <p className="text-lg font-semibold text-success">{item.impact}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Investment Goals & Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-accent" />
              Investment Goals Progress
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Annual Return Target</span>
                  <span className="text-foreground">10.3% / 12%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: '86%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Carbon Offset Goal</span>
                  <span className="text-foreground">850 / 1000 tCO₂</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Risk Diversification</span>
                  <span className="text-foreground">8.7 / 10</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: '87%' }}></div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-accent" />
              Smart Recommendations
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-success/5 border border-success/20 rounded-lg">
                <p className="text-sm font-medium text-foreground mb-1">
                  Increase Hydro Power Allocation
                </p>
                <p className="text-xs text-muted-foreground">
                  Consider adding 5-8% in hydroelectric projects for better diversification
                </p>
              </div>
              
              <div className="p-3 bg-accent/5 border border-accent/20 rounded-lg">
                <p className="text-sm font-medium text-foreground mb-1">
                  Explore Energy Storage Bonds
                </p>
                <p className="text-xs text-muted-foreground">
                  Battery storage projects showing 15%+ returns in Q4
                </p>
              </div>
              
              <div className="p-3 bg-trust/5 border border-trust/20 rounded-lg">
                <p className="text-sm font-medium text-foreground mb-1">
                  Rebalance Geographic Exposure
                </p>
                <p className="text-xs text-muted-foreground">
                  Consider increasing APAC allocation for emerging market opportunities
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Portfolio;