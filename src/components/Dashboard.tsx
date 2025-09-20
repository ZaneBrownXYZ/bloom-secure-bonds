import { EncryptedChart } from "./EncryptedChart";
import { WalletConnect } from "./WalletConnect";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  DollarSign, 
  Leaf, 
  Shield, 
  Lock,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react";

export const Dashboard = () => {
  const bondData = [
    {
      title: "Solar Farm Portfolio",
      value: "$2.4M",
      change: "+12.5%",
      isPositive: true,
      accessLevel: "authorized" as const,
    },
    {
      title: "Wind Energy Bonds",
      value: "$1.8M",
      change: "+8.2%", 
      isPositive: true,
      accessLevel: "authorized" as const,
    },
    {
      title: "Carbon Credit Futures",
      value: "████████",
      change: "████████",
      isPositive: false,
      accessLevel: "encrypted" as const,
    },
    {
      title: "Reforestation Projects",
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
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Private Sustainable Finance
              </h1>
              <p className="text-sm text-muted-foreground">
                Encrypted green bond marketplace
              </p>
            </div>
            <WalletConnect />
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Portfolio</p>
                <p className="text-2xl font-bold text-foreground">$4.2M</p>
              </div>
              <DollarSign className="w-8 h-8 text-accent" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Green Impact</p>
                <p className="text-2xl font-bold text-success">850 tCO₂</p>
              </div>
              <Leaf className="w-8 h-8 text-success" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Security Level</p>
                <Badge variant="outline" className="mt-1 bg-trust/10 text-trust border-trust/30">
                  <Shield className="w-3 h-3 mr-1" />
                  Encrypted
                </Badge>
              </div>
              <Lock className="w-8 h-8 text-trust" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Return</p>
                <p className="text-2xl font-bold text-success">+10.3%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-success" />
            </div>
          </Card>
        </div>

        {/* Bond Performance Charts */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Bond Performance Analytics
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {bondData.map((bond, index) => (
              <EncryptedChart key={index} {...bond} />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/analytics">
            <Button variant="premium" size="lg" className="h-16 w-full">
              <BarChart3 className="w-5 h-5 mr-2" />
              View Full Analytics
            </Button>
          </Link>
          
          <Link to="/portfolio">
            <Button variant="encrypted" size="lg" className="h-16 w-full">
              <PieChart className="w-5 h-5 mr-2" />
              Portfolio Insights
            </Button>
          </Link>
          
          <Link to="/real-time-data">
            <Button variant="trust" size="lg" className="h-16 w-full">
              <Activity className="w-5 h-5 mr-2" />
              Real-time Data
            </Button>
          </Link>
        </div>

        {/* Access Notice */}
        <Card className="mt-8 p-6 bg-warning/5 border-warning/30">
          <div className="flex items-start gap-4">
            <Lock className="w-6 h-6 text-warning mt-1" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Accredited Investor Access Required
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Some performance data is encrypted and only accessible to verified accredited investors. 
                Connect your wallet and complete verification to unlock full analytics and trading capabilities.
              </p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};