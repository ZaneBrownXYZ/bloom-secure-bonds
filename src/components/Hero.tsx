import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Logo } from "./Logo";
import { Link } from "react-router-dom";
import { 
  Shield, 
  Leaf, 
  TrendingUp, 
  Lock, 
  ChevronRight,
  Sparkles
} from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-background/95 to-card overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-trust/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative container mx-auto px-6 py-20">
        {/* Header */}
        <header className="flex items-center justify-between mb-16">
          <Logo showText={true} />
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-success/10 text-success border-success/30">
              <Sparkles className="w-3 h-3 mr-1" />
              Institutional Grade
            </Badge>
            <Button variant="outline">
              Documentation
            </Button>
          </div>
        </header>

        {/* Main Hero Content */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Private Sustainable
            <br />
            <span className="bg-gradient-eco bg-clip-text text-transparent">
              Finance
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
            Encrypted green bond marketplace for accredited investors. 
            Access institutional-grade sustainable finance with blockchain security.
          </p>

          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 px-4 py-2 bg-card/50 rounded-full border border-border">
              <Shield className="w-4 h-4 text-trust" />
              <span className="text-sm text-foreground">Encrypted Data</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card/50 rounded-full border border-border">
              <Leaf className="w-4 h-4 text-success" />
              <span className="text-sm text-foreground">Green Certified</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card/50 rounded-full border border-border">
              <TrendingUp className="w-4 h-4 text-accent" />
              <span className="text-sm text-foreground">Institutional Returns</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/dashboard">
              <Button variant="premium" size="lg" className="text-lg px-8 py-6">
                <Lock className="w-5 h-5 mr-2" />
                Access Dashboard
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            
            <Link to="/learn-more">
              <Button variant="encrypted" size="lg" className="text-lg px-8 py-6">
                Learn More
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">$2.4B+</div>
              <div className="text-sm text-muted-foreground">Assets Under Management</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-2">850k+</div>
              <div className="text-sm text-muted-foreground">Tons CO₂ Offset</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-trust mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground">Security Uptime</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-accent/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-accent rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};