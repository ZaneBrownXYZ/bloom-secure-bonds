import { useEffect, useState } from "react";
import { Trees, Layers3 } from "lucide-react";

export const AnimatedFooter = () => {
  const [animateBlocks, setAnimateBlocks] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateBlocks(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const generateBlocks = () => {
    return Array.from({ length: 8 }, (_, i) => (
      <div
        key={i}
        className={`transition-all duration-1000 ${
          animateBlocks ? 'opacity-100 translate-y-0' : 'opacity-60 translate-y-2'
        }`}
        style={{ transitionDelay: `${i * 150}ms` }}
      >
        <Layers3 className="w-4 h-4 text-trust/40 cube-rotate" />
      </div>
    ));
  };

  const generateTrees = () => {
    return Array.from({ length: 5 }, (_, i) => {
      const delays = [500, 800, 1200, 1600, 2000];
      return (
        <div
          key={i}
          className="tree-grow opacity-0"
          style={{ 
            animationDelay: `${delays[i]}ms`,
            animationFillMode: 'forwards'
          }}
        >
          <Trees 
            className={`text-accent ${
              i === 2 ? 'w-8 h-8' : i === 1 || i === 3 ? 'w-6 h-6' : 'w-4 h-4'
            }`} 
          />
        </div>
      );
    });
  };

  return (
    <footer className="relative bg-card/30 backdrop-blur-sm border-t border-border">
      <div className="container mx-auto px-6 py-12">
        {/* Animated scene */}
        <div className="flex items-end justify-center mb-8 h-20">
          {/* Blockchain blocks foundation */}
          <div className="flex items-end gap-2 mr-4">
            {generateBlocks()}
          </div>
          
          {/* Growing trees */}
          <div className="flex items-end gap-3">
            {generateTrees()}
          </div>
        </div>

        {/* Footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          <div className="md:col-span-2">
            <h3 className="font-bold text-lg mb-3 text-foreground">
              Private Sustainable Finance
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Encrypted green bond marketplace for accredited investors. 
              Combining blockchain security with sustainable finance innovation.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 text-foreground">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-accent cursor-pointer transition-colors">Green Bonds</li>
              <li className="hover:text-accent cursor-pointer transition-colors">Analytics</li>
              <li className="hover:text-accent cursor-pointer transition-colors">Portfolio</li>
              <li className="hover:text-accent cursor-pointer transition-colors">Reports</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 text-foreground">Access</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-accent cursor-pointer transition-colors">Accreditation</li>
              <li className="hover:text-accent cursor-pointer transition-colors">Compliance</li>
              <li className="hover:text-accent cursor-pointer transition-colors">Security</li>
              <li className="hover:text-accent cursor-pointer transition-colors">Support</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 GreenVault. Institutional-grade sustainable finance platform.</p>
        </div>
      </div>
    </footer>
  );
};