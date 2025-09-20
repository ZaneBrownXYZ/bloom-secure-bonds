import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, TrendingUp, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EncryptedChartProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  accessLevel: "encrypted" | "authorized";
}

export const EncryptedChart = ({ 
  title, 
  value, 
  change, 
  isPositive, 
  accessLevel 
}: EncryptedChartProps) => {
  const [isRevealed, setIsRevealed] = useState(accessLevel === "authorized");

  const generateEncryptedBars = () => {
    return Array.from({ length: 12 }, (_, i) => (
      <div
        key={i}
        className={`w-2 bg-accent/30 rounded-sm transition-all duration-300 ${
          isRevealed 
            ? `h-${Math.floor(Math.random() * 8 + 4)}` 
            : 'h-4 animate-pulse'
        }`}
        style={{
          height: isRevealed 
            ? `${Math.random() * 40 + 20}px` 
            : '16px',
          animationDelay: `${i * 100}ms`
        }}
      />
    ));
  };

  return (
    <Card className="p-6 chart-encrypted hover:glow-encrypted">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-foreground">{title}</h3>
          {accessLevel === "encrypted" && (
            <Badge variant="outline" className="mt-1 text-xs bg-destructive/10 text-destructive border-destructive/30">
              <Lock className="w-3 h-3 mr-1" />
              Encrypted
            </Badge>
          )}
        </div>
        
        {accessLevel === "authorized" && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsRevealed(!isRevealed)}
            className="text-muted-foreground hover:text-accent"
          >
            {isRevealed ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </Button>
        )}
      </div>

      <div className="mb-4">
        {isRevealed ? (
          <>
            <div className="text-2xl font-bold text-foreground mb-1">{value}</div>
            <div className={`flex items-center text-sm ${
              isPositive ? 'text-success' : 'text-destructive'
            }`}>
              <TrendingUp className="w-3 h-3 mr-1" />
              {change}
            </div>
          </>
        ) : (
          <>
            <div className="h-8 w-24 bg-accent/20 rounded animate-pulse mb-1"></div>
            <div className="h-4 w-16 bg-accent/20 rounded animate-pulse"></div>
          </>
        )}
      </div>

      {/* Chart visualization */}
      <div className="flex items-end justify-between gap-1 h-16">
        {generateEncryptedBars()}
      </div>

      {!isRevealed && (
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            Connect accredited wallet to decrypt data
          </p>
        </div>
      )}
    </Card>
  );
};