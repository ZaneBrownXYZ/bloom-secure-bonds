import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Loader2, Shield, TrendingUp, Lock } from 'lucide-react';
import { toast } from 'sonner';

// Contract ABI for BloomSecureBonds
const CONTRACT_ABI = [
  {
    "inputs": [
      {"name": "_name", "type": "string"},
      {"name": "_symbol", "type": "string"},
      {"name": "_description", "type": "string"},
      {"name": "_faceValue", "type": "uint256"},
      {"name": "_couponRate", "type": "uint256"},
      {"name": "_maturityPeriod", "type": "uint256"},
      {"name": "_totalSupply", "type": "uint256"}
    ],
    "name": "issueBond",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"name": "bondId", "type": "uint256"},
      {"name": "quantity", "type": "uint256"},
      {"name": "price", "type": "uint256"}
    ],
    "name": "purchaseBond",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {"name": "bondId", "type": "uint256"},
      {"name": "quantity", "type": "uint256"},
      {"name": "price", "type": "uint256"},
      {"name": "seller", "type": "address"}
    ],
    "name": "executeTrade",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

// Contract address (deploy this first)
const CONTRACT_ADDRESS = "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6"; // Replace with actual deployed address

interface BondFormData {
  name: string;
  symbol: string;
  description: string;
  faceValue: string;
  couponRate: string;
  maturityPeriod: string;
  totalSupply: string;
}

interface TradeFormData {
  bondId: string;
  quantity: string;
  price: string;
  seller: string;
}

export const ContractInteraction = () => {
  const { address, isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState<'issue' | 'purchase' | 'trade'>('issue');
  const [bondForm, setBondForm] = useState<BondFormData>({
    name: '',
    symbol: '',
    description: '',
    faceValue: '',
    couponRate: '',
    maturityPeriod: '',
    totalSupply: ''
  });
  const [tradeForm, setTradeForm] = useState<TradeFormData>({
    bondId: '',
    quantity: '',
    price: '',
    seller: ''
  });

  // Issue Bond
  const { writeContract: writeIssueBond, data: issueHash, isPending: isIssuing } = useWriteContract();
  const { isLoading: isConfirmingIssue } = useWaitForTransactionReceipt({
    hash: issueHash,
  });

  // Purchase Bond
  const { writeContract: writePurchaseBond, data: purchaseHash, isPending: isPurchasing } = useWriteContract();
  const { isLoading: isConfirmingPurchase } = useWaitForTransactionReceipt({
    hash: purchaseHash,
  });

  // Execute Trade
  const { writeContract: writeExecuteTrade, data: tradeHash, isPending: isTrading } = useWriteContract();
  const { isLoading: isConfirmingTrade } = useWaitForTransactionReceipt({
    hash: tradeHash,
  });

  const handleIssueBond = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      await writeIssueBond({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'issueBond',
        args: [
          bondForm.name,
          bondForm.symbol,
          bondForm.description,
          BigInt(bondForm.faceValue),
          BigInt(bondForm.couponRate),
          BigInt(bondForm.maturityPeriod),
          BigInt(bondForm.totalSupply)
        ],
      });
      toast.success("Bond issuance transaction submitted!");
    } catch (error) {
      console.error('Error issuing bond:', error);
      toast.error("Failed to issue bond");
    }
  };

  const handlePurchaseBond = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      await writePurchaseBond({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'purchaseBond',
        args: [
          BigInt(tradeForm.bondId),
          BigInt(tradeForm.quantity),
          BigInt(tradeForm.price)
        ],
        value: BigInt(tradeForm.quantity) * BigInt(tradeForm.price),
      });
      toast.success("Bond purchase transaction submitted!");
    } catch (error) {
      console.error('Error purchasing bond:', error);
      toast.error("Failed to purchase bond");
    }
  };

  const handleExecuteTrade = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      await writeExecuteTrade({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'executeTrade',
        args: [
          BigInt(tradeForm.bondId),
          BigInt(tradeForm.quantity),
          BigInt(tradeForm.price),
          tradeForm.seller as `0x${string}`
        ],
      });
      toast.success("Trade execution transaction submitted!");
    } catch (error) {
      console.error('Error executing trade:', error);
      toast.error("Failed to execute trade");
    }
  };

  if (!isConnected) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Contract Interaction
          </CardTitle>
          <CardDescription>
            Connect your wallet to interact with the Bloom Secure Bonds smart contract
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Shield className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Please connect your wallet to access contract functions
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Smart Contract Interaction
        </CardTitle>
        <CardDescription>
          Interact with FHE-encrypted bond contracts for secure trading
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === 'issue' ? 'default' : 'outline'}
            onClick={() => setActiveTab('issue')}
            className="flex items-center gap-2"
          >
            <Shield className="w-4 h-4" />
            Issue Bond
          </Button>
          <Button
            variant={activeTab === 'purchase' ? 'default' : 'outline'}
            onClick={() => setActiveTab('purchase')}
            className="flex items-center gap-2"
          >
            <TrendingUp className="w-4 h-4" />
            Purchase Bond
          </Button>
          <Button
            variant={activeTab === 'trade' ? 'default' : 'outline'}
            onClick={() => setActiveTab('trade')}
            className="flex items-center gap-2"
          >
            <Lock className="w-4 h-4" />
            Execute Trade
          </Button>
        </div>

        {/* Issue Bond Form */}
        {activeTab === 'issue' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bondName">Bond Name</Label>
                <Input
                  id="bondName"
                  value={bondForm.name}
                  onChange={(e) => setBondForm({...bondForm, name: e.target.value})}
                  placeholder="e.g., Corporate Bond 2024"
                />
              </div>
              <div>
                <Label htmlFor="bondSymbol">Symbol</Label>
                <Input
                  id="bondSymbol"
                  value={bondForm.symbol}
                  onChange={(e) => setBondForm({...bondForm, symbol: e.target.value})}
                  placeholder="e.g., CB2024"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="bondDescription">Description</Label>
              <Textarea
                id="bondDescription"
                value={bondForm.description}
                onChange={(e) => setBondForm({...bondForm, description: e.target.value})}
                placeholder="Describe the bond purpose and terms..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="faceValue">Face Value (ETH)</Label>
                <Input
                  id="faceValue"
                  type="number"
                  value={bondForm.faceValue}
                  onChange={(e) => setBondForm({...bondForm, faceValue: e.target.value})}
                  placeholder="1000"
                />
              </div>
              <div>
                <Label htmlFor="couponRate">Coupon Rate (%)</Label>
                <Input
                  id="couponRate"
                  type="number"
                  value={bondForm.couponRate}
                  onChange={(e) => setBondForm({...bondForm, couponRate: e.target.value})}
                  placeholder="5"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="maturityPeriod">Maturity Period (days)</Label>
                <Input
                  id="maturityPeriod"
                  type="number"
                  value={bondForm.maturityPeriod}
                  onChange={(e) => setBondForm({...bondForm, maturityPeriod: e.target.value})}
                  placeholder="365"
                />
              </div>
              <div>
                <Label htmlFor="totalSupply">Total Supply</Label>
                <Input
                  id="totalSupply"
                  type="number"
                  value={bondForm.totalSupply}
                  onChange={(e) => setBondForm({...bondForm, totalSupply: e.target.value})}
                  placeholder="1000"
                />
              </div>
            </div>

            <Button
              onClick={handleIssueBond}
              disabled={isIssuing || isConfirmingIssue}
              className="w-full"
            >
              {isIssuing || isConfirmingIssue ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {isIssuing ? 'Issuing Bond...' : 'Confirming...'}
                </>
              ) : (
                'Issue Bond'
              )}
            </Button>
          </div>
        )}

        {/* Purchase Bond Form */}
        {activeTab === 'purchase' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="purchaseBondId">Bond ID</Label>
                <Input
                  id="purchaseBondId"
                  value={tradeForm.bondId}
                  onChange={(e) => setTradeForm({...tradeForm, bondId: e.target.value})}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="purchaseQuantity">Quantity</Label>
                <Input
                  id="purchaseQuantity"
                  type="number"
                  value={tradeForm.quantity}
                  onChange={(e) => setTradeForm({...tradeForm, quantity: e.target.value})}
                  placeholder="10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="purchasePrice">Price per Bond (ETH)</Label>
              <Input
                id="purchasePrice"
                type="number"
                value={tradeForm.price}
                onChange={(e) => setTradeForm({...tradeForm, price: e.target.value})}
                placeholder="1.0"
              />
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                Total Cost: {tradeForm.quantity && tradeForm.price ? 
                  (parseFloat(tradeForm.quantity) * parseFloat(tradeForm.price)).toFixed(4) : '0'} ETH
              </p>
            </div>

            <Button
              onClick={handlePurchaseBond}
              disabled={isPurchasing || isConfirmingPurchase}
              className="w-full"
            >
              {isPurchasing || isConfirmingPurchase ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {isPurchasing ? 'Purchasing...' : 'Confirming...'}
                </>
              ) : (
                'Purchase Bond'
              )}
            </Button>
          </div>
        )}

        {/* Execute Trade Form */}
        {activeTab === 'trade' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tradeBondId">Bond ID</Label>
                <Input
                  id="tradeBondId"
                  value={tradeForm.bondId}
                  onChange={(e) => setTradeForm({...tradeForm, bondId: e.target.value})}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="tradeQuantity">Quantity</Label>
                <Input
                  id="tradeQuantity"
                  type="number"
                  value={tradeForm.quantity}
                  onChange={(e) => setTradeForm({...tradeForm, quantity: e.target.value})}
                  placeholder="5"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tradePrice">Price per Bond (ETH)</Label>
                <Input
                  id="tradePrice"
                  type="number"
                  value={tradeForm.price}
                  onChange={(e) => setTradeForm({...tradeForm, price: e.target.value})}
                  placeholder="1.05"
                />
              </div>
              <div>
                <Label htmlFor="sellerAddress">Seller Address</Label>
                <Input
                  id="sellerAddress"
                  value={tradeForm.seller}
                  onChange={(e) => setTradeForm({...tradeForm, seller: e.target.value})}
                  placeholder="0x..."
                />
              </div>
            </div>

            <Button
              onClick={handleExecuteTrade}
              disabled={isTrading || isConfirmingTrade}
              className="w-full"
            >
              {isTrading || isConfirmingTrade ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {isTrading ? 'Executing Trade...' : 'Confirming...'}
                </>
              ) : (
                'Execute Trade'
              )}
            </Button>
          </div>
        )}

        {/* Transaction Status */}
        {(issueHash || purchaseHash || tradeHash) && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-2">Transaction Status</h4>
            <div className="space-y-2">
              {issueHash && (
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Issue Bond</Badge>
                  <span className="text-sm font-mono">{issueHash}</span>
                </div>
              )}
              {purchaseHash && (
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Purchase Bond</Badge>
                  <span className="text-sm font-mono">{purchaseHash}</span>
                </div>
              )}
              {tradeHash && (
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Execute Trade</Badge>
                  <span className="text-sm font-mono">{tradeHash}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
