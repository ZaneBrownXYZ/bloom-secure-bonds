import { Leaf, Layers3 } from "lucide-react";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo = ({ className = "", showText = true }: LogoProps) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        {/* Blockchain cube base */}
        <div className="relative w-8 h-8 cube-rotate">
          <Layers3 className="w-8 h-8 text-trust" />
        </div>
        {/* Intertwined leaf */}
        <div className="absolute -top-1 -right-1 rotate-12">
          <Leaf className="w-5 h-5 text-accent fill-current" />
        </div>
        {/* Subtle glow effect */}
        <div className="absolute inset-0 w-8 h-8 rounded bg-accent/20 blur-sm -z-10"></div>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className="font-bold text-lg text-foreground leading-tight">
            GreenVault
          </span>
          <span className="text-xs text-muted-foreground leading-tight">
            Private Finance
          </span>
        </div>
      )}
    </div>
  );
};