# Bloom Secure Bonds

A decentralized platform for secure bond trading with fully homomorphic encryption (FHE) technology, ensuring privacy and security for institutional investors.

## Features

- **FHE-Encrypted Trading**: All sensitive financial data is encrypted using fully homomorphic encryption
- **Multi-Wallet Support**: Connect with Rainbow, MetaMask, WalletConnect, and other popular wallets
- **Real-time Analytics**: Secure, encrypted analytics dashboard for bond performance
- **Accredited Investor Verification**: Built-in KYC/AML compliance for institutional investors
- **Decentralized Architecture**: Smart contracts deployed on Sepolia testnet

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Web3**: Wagmi, RainbowKit, Viem
- **Blockchain**: Ethereum Sepolia Testnet
- **Encryption**: Fully Homomorphic Encryption (FHE)
- **State Management**: TanStack Query

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ZaneBrownXYZ/bloom-secure-bonds.git
cd bloom-secure-bonds
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:8080](http://localhost:8080) in your browser

## Environment Configuration

The application uses the following environment variables:

- `NEXT_PUBLIC_CHAIN_ID`: Ethereum Sepolia (11155111)
- `NEXT_PUBLIC_RPC_URL`: Sepolia RPC endpoint
- `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`: WalletConnect project ID
- `NEXT_PUBLIC_INFURA_API_KEY`: Infura API key for RPC access

## Smart Contracts

The platform includes FHE-enabled smart contracts for:
- Bond issuance and trading
- Encrypted data storage
- Privacy-preserving analytics
- Compliance verification

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
npm run preview
```

## Security

- All sensitive data is encrypted using FHE
- Smart contracts are audited and verified
- Multi-signature wallet support for institutional users
- Privacy-preserving analytics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For technical support or questions, please open an issue on GitHub.
