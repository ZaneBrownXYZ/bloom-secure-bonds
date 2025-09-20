import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/Logo";
import { WalletConnect } from "@/components/WalletConnect";
import { EncryptedChart } from "@/components/EncryptedChart";
import { 
  ArrowLeft,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  Download,
  Filter
} from "lucide-react";
import { Link } from "react-router-dom";

const Analytics = () => {
  const detailedBondData = [
    {
      title: "Solar Farm Portfolio - Q4 Performance",
      value: "$2.4M",
      change: "+12.5%",
      isPositive: true,
      accessLevel: "authorized" as const,
    },
    {
      title: "Wind Energy Bonds - Monthly Yield",
      value: "$1.8M",
      change: "+8.2%",
      isPositive: true,
      accessLevel: "authorized" as const,
    },
    {
      title: "Carbon Credit Futures - YTD",
      value: "████████",
      change: "████████",
      isPositive: false,
      accessLevel: "encrypted" as const,
    },
    {
      title: "Reforestation Projects - ROI Analysis",
      value: "████████",
      change: "████████",
      isPositive: true,
      accessLevel: "encrypted" as const,
    },
    {
      title: "Green Infrastructure Bonds",
      value: "$950K",
      change: "+15.8%",
      isPositive: true,
      accessLevel: "authorized" as const,
    },
    {
      title: "Sustainable Agriculture Portfolio",
      value: "████████",
      change: "████████",
      isPositive: true,
      accessLevel: "encrypted" as const,
    },
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
                  Full Analytics Dashboard
                </h1>
                <p className="text-sm text-muted-foreground">
                  Comprehensive performance analysis
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
        {/* Analytics Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Date Range
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-success/10 text-success border-success/30">
              Live Data
            </Badge>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total ROI</p>
                <p className="text-2xl font-bold text-success">+10.3%</p>
                <p className="text-xs text-muted-foreground mt-1">YTD Performance</p>
              </div>
              <TrendingUp className="w-8 h-8 text-success" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Risk Adjusted Return</p>
                <p className="text-2xl font-bold text-accent">8.7%</p>
                <p className="text-xs text-muted-foreground mt-1">Sharpe Ratio: 1.24</p>
              </div>
              <BarChart3 className="w-8 h-8 text-accent" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">ESG Score</p>
                <p className="text-2xl font-bold text-success">A+</p>
                <p className="text-xs text-muted-foreground mt-1">Top 5% Rating</p>
              </div>
              <PieChart className="w-8 h-8 text-success" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Volatility</p>
                <p className="text-2xl font-bold text-trust">4.2%</p>
                <p className="text-xs text-muted-foreground mt-1">30-day average</p>
              </div>
              <Activity className="w-8 h-8 text-trust" />
            </div>
          </Card>
        </div>

        {/* Detailed Performance Charts */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Detailed Performance Analysis
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {detailedBondData.map((bond, index) => (
              <EncryptedChart key={index} {...bond} />
            ))}
          </div>
        </div>

        {/* Advanced Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Portfolio Allocation
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Solar Energy</span>
                <span className="text-sm font-medium">35%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Wind Power</span>
                <span className="text-sm font-medium">28%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Carbon Credits</span>
                <span className="text-sm font-medium">████</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Reforestation</span>
                <span className="text-sm font-medium">████</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Risk Metrics
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Value at Risk (95%)</span>
                <span className="text-sm font-medium text-warning">-2.1%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Max Drawdown</span>
                <span className="text-sm font-medium text-warning">-5.3%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Beta (vs Market)</span>
                <span className="text-sm font-medium">0.68</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Correlation</span>
                <span className="text-sm font-medium">0.42</span>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Analytics;