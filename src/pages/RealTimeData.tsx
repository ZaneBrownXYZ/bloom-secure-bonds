import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/Logo";
import { WalletConnect } from "@/components/WalletConnect";
import { 
  ArrowLeft,
  Activity,
  Zap,
  RefreshCw,
  Signal,
  Clock,
  Database,
  Wifi,
  AlertCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const RealTimeData = () => {
  const liveDataStreams = [
    {
      source: "Solar Farm Network",
      status: "Active",
      latency: "0.12s",
      dataPoints: "1,247,892",
      accuracy: "99.8%",
      lastUpdate: "2 seconds ago"
    },
    {
      source: "Wind Power Grid",
      status: "Active", 
      latency: "0.08s",
      dataPoints: "892,547",
      accuracy: "99.9%",
      lastUpdate: "1 second ago"
    },
    {
      source: "Carbon Credit Exchange",
      status: "Encrypted",
      latency: "████",
      dataPoints: "████████",
      accuracy: "████",
      lastUpdate: "████████"
    },
    {
      source: "ESG Rating Feed",
      status: "Active",
      latency: "0.15s", 
      dataPoints: "456,123",
      accuracy: "98.7%",
      lastUpdate: "3 seconds ago"
    }
  ];

  const marketData = [
    {
      instrument: "Green Bond Index",
      price: "$102.45",
      change: "+0.23%",
      volume: "45.2M",
      isPositive: true
    },
    {
      instrument: "Solar Energy ETF",
      price: "$78.92",
      change: "+1.15%", 
      volume: "23.8M",
      isPositive: true
    },
    {
      instrument: "Carbon Futures",
      price: "████████",
      change: "████████",
      volume: "████████",
      isPositive: false
    },
    {
      instrument: "Wind Power REIT",
      price: "$156.34",
      change: "-0.45%",
      volume: "12.7M", 
      isPositive: false
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
                  Real-Time Data Center
                </h1>
                <p className="text-sm text-muted-foreground">
                  Live market data and performance monitoring
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                <Signal className="w-3 h-3 mr-1" />
                Live Connection
              </Badge>
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
        {/* System Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">System Status</p>
                <p className="text-lg font-bold text-success">Operational</p>
                <p className="text-xs text-muted-foreground mt-1">99.9% uptime</p>
              </div>
              <Zap className="w-8 h-8 text-success" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Data Latency</p>
                <p className="text-lg font-bold text-accent">0.08s</p>
                <p className="text-xs text-muted-foreground mt-1">Average response</p>
              </div>
              <Clock className="w-8 h-8 text-accent" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Feeds</p>
                <p className="text-lg font-bold text-foreground">347</p>
                <p className="text-xs text-muted-foreground mt-1">Data sources</p>
              </div>
              <Database className="w-8 h-8 text-trust" />
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Updates/Min</p>
                <p className="text-lg font-bold text-primary">2,847</p>
                <p className="text-xs text-muted-foreground mt-1">Real-time changes</p>
              </div>
              <RefreshCw className="w-8 h-8 text-primary animate-spin" />
            </div>
          </Card>
        </div>

        {/* Live Data Streams */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            Live Data Streams
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {liveDataStreams.map((stream, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{stream.source}</h3>
                    <Badge 
                      variant="outline" 
                      className={
                        stream.status === "Active" 
                          ? "bg-success/10 text-success border-success/30"
                          : "bg-warning/10 text-warning border-warning/30"
                      }
                    >
                      <Wifi className="w-3 h-3 mr-1" />
                      {stream.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Latency</p>
                    <p className="text-lg font-bold text-accent">{stream.latency}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Data Points</p>
                    <p className="text-sm font-semibold text-foreground">{stream.dataPoints}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Accuracy</p>
                    <p className="text-sm font-semibold text-success">{stream.accuracy}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Last Update</p>
                    <p className="text-sm font-semibold text-trust">{stream.lastUpdate}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Market Data Feed */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Live Market Data
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketData.map((item, index) => (
              <Card key={index} className="p-6">
                <div className="text-center">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    {item.instrument}
                  </h3>
                  <p className="text-2xl font-bold text-foreground mb-2">
                    {item.price}
                  </p>
                  <p className={`text-sm font-semibold mb-1 ${
                    item.isPositive ? 'text-success' : 
                    item.price.includes('█') ? 'text-muted-foreground' : 'text-destructive'
                  }`}>
                    {item.change}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Vol: {item.volume}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Alerts & Notifications */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-warning" />
            Real-Time Alerts
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-success/5 border border-success/20 rounded-lg">
              <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Solar Farm Portfolio exceeds target yield
                </p>
                <p className="text-xs text-muted-foreground">
                  Current yield: 14.2% | Target: 12% | 2 minutes ago
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-accent/5 border border-accent/20 rounded-lg">
              <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  New green bond issuance detected
                </p>
                <p className="text-xs text-muted-foreground">
                  Hydroelectric project in Nordic region | 5 minutes ago
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-warning/5 border border-warning/20 rounded-lg">
              <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Encrypted data stream requires verification
                </p>
                <p className="text-xs text-muted-foreground">
                  Carbon credit futures data access pending | 8 minutes ago
                </p>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default RealTimeData;