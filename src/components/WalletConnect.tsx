import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle2 } from "lucide-react";
import { useAccount, useDisconnect } from 'wagmi';
import { useState, useEffect } from 'react';

export const WalletConnect = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [isAccredited, setIsAccredited] = useState(false);

  useEffect(() => {
    if (isConnected && address) {
      // Simulate accreditation check after connection
      setTimeout(() => setIsAccredited(true), 1500);
    } else {
      setIsAccredited(false);
    }
  }, [isConnected, address]);

  if (!isConnected) {
    return (
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          const ready = mounted && authenticationStatus !== 'loading';
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus ||
              authenticationStatus === 'authenticated');

          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                style: {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button
                      onClick={openConnectModal}
                      type="button"
                      className="wallet-pulse bg-gradient-trust hover:scale-105 transition-transform px-4 py-2 rounded-lg text-white font-medium"
                    >
                      Connect Wallet
                    </button>
                    );
                }

                if (chain.unsupported) {
                  return (
                    <button onClick={openChainModal} type="button">
                      Wrong network
                    </button>
                  );
                }

                return (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-2 bg-card/50 rounded-lg border border-border">
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                      <span className="text-sm text-muted-foreground">
                        {account.displayName}
                      </span>
                    </div>
                    
                    {isAccredited ? (
                      <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                        <Shield className="w-3 h-3 mr-1" />
                        Accredited
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">
                        <CheckCircle2 className="w-3 h-3 mr-1 animate-spin" />
                        Verifying...
                      </Badge>
                    )}
                    
                    <button
                      onClick={openAccountModal}
                      type="button"
                      className="text-muted-foreground hover:text-foreground px-2 py-1 text-sm border rounded"
                    >
                      Account
                    </button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    );
  }

  return null;
};