import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/Logo";
import { AnimatedFooter } from "@/components/AnimatedFooter";
import { 
  Shield, 
  Leaf, 
  TrendingUp, 
  Lock, 
  ChevronRight,
  ArrowLeft,
  Users,
  Globe,
  Award
} from "lucide-react";
import { Link } from "react-router-dom";

const LearnMore = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Logo showText={true} />
            <Link to="/">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Revolutionizing Sustainable Finance
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Our platform combines blockchain security with green bond investing, 
            creating the world's first encrypted marketplace for sustainable finance.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="p-6">
            <Shield className="w-12 h-12 text-trust mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-3">Bank-Grade Security</h3>
            <p className="text-muted-foreground">
              Advanced encryption and blockchain technology protect your investments 
              and sensitive financial data.
            </p>
          </Card>

          <Card className="p-6">
            <Leaf className="w-12 h-12 text-success mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-3">Verified Green Projects</h3>
            <p className="text-muted-foreground">
              All projects undergo rigorous environmental impact verification 
              by certified third-party auditors.
            </p>
          </Card>

          <Card className="p-6">
            <TrendingUp className="w-12 h-12 text-accent mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-3">Institutional Returns</h3>
            <p className="text-muted-foreground">
              Access professional-grade investment opportunities typically 
              reserved for large institutions.
            </p>
          </Card>

          <Card className="p-6">
            <Users className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-3">Accredited Investors Only</h3>
            <p className="text-muted-foreground">
              Exclusive platform for verified accredited investors seeking 
              sustainable investment opportunities.
            </p>
          </Card>

          <Card className="p-6">
            <Globe className="w-12 h-12 text-accent mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-3">Global Impact</h3>
            <p className="text-muted-foreground">
              Portfolio includes projects across renewable energy, carbon credits, 
              and environmental restoration worldwide.
            </p>
          </Card>

          <Card className="p-6">
            <Award className="w-12 h-12 text-success mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-3">ESG Certified</h3>
            <p className="text-muted-foreground">
              All investments meet strict Environmental, Social, and Governance 
              criteria with transparent reporting.
            </p>
          </Card>
        </div>

        {/* Process Flow */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Connect Wallet</h3>
              <p className="text-sm text-muted-foreground">
                Secure connection with your crypto wallet for identity verification
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Verify Status</h3>
              <p className="text-sm text-muted-foreground">
                Complete accredited investor verification process
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Browse Projects</h3>
              <p className="text-sm text-muted-foreground">
                Explore encrypted green bond opportunities
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">4</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Invest</h3>
              <p className="text-sm text-muted-foreground">
                Make secure investments and track performance
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="p-8 text-center bg-gradient-to-br from-primary/5 to-accent/5">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Ready to Start Your Sustainable Investment Journey?
          </h2>
          <p className="text-muted-foreground mb-6">
            Join the future of green finance with institutional-grade security and returns.
          </p>
          <Link to="/dashboard">
            <Button variant="premium" size="lg">
              <Lock className="w-5 h-5 mr-2" />
              Access Dashboard
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </Card>
      </main>

      <AnimatedFooter />
    </div>
  );
};

export default LearnMore;