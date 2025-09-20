// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract BloomSecureBonds is SepoliaConfig {
    using FHE for *;
    
    struct Bond {
        euint32 bondId;
        euint32 faceValue;
        euint32 currentPrice;
        euint32 couponRate;
        euint32 maturityPeriod;
        euint32 totalSupply;
        euint32 availableSupply;
        bool isActive;
        bool isVerified;
        string name;
        string symbol;
        string description;
        address issuer;
        uint256 issueDate;
        uint256 maturityDate;
        uint256 couponPaymentDate;
    }
    
    struct BondHolding {
        euint32 holdingId;
        euint32 bondId;
        euint32 quantity;
        euint32 purchasePrice;
        address holder;
        uint256 purchaseDate;
        bool isEncrypted;
    }
    
    struct Trade {
        euint32 tradeId;
        euint32 bondId;
        euint32 quantity;
        euint32 price;
        address buyer;
        address seller;
        uint256 timestamp;
        bool isSettled;
    }
    
    struct EncryptedAnalytics {
        euint32 analyticsId;
        euint32 totalVolume;
        euint32 averagePrice;
        euint32 priceVolatility;
        euint32 liquidityScore;
        bool isCalculated;
        address calculator;
        uint256 timestamp;
    }
    
    mapping(uint256 => Bond) public bonds;
    mapping(uint256 => BondHolding) public holdings;
    mapping(uint256 => Trade) public trades;
    mapping(uint256 => EncryptedAnalytics) public analytics;
    mapping(address => euint32) public investorReputation;
    mapping(address => euint32) public issuerReputation;
    mapping(address => euint32) public encryptedBalance;
    
    uint256 public bondCounter;
    uint256 public holdingCounter;
    uint256 public tradeCounter;
    uint256 public analyticsCounter;
    
    address public owner;
    address public verifier;
    address public analyticsProvider;
    
    event BondIssued(uint256 indexed bondId, address indexed issuer, string name);
    event BondPurchased(uint256 indexed holdingId, uint256 indexed bondId, address indexed buyer, uint32 quantity);
    event TradeExecuted(uint256 indexed tradeId, uint256 indexed bondId, address indexed buyer, address seller, uint32 quantity);
    event AnalyticsUpdated(uint256 indexed analyticsId, uint256 indexed bondId, address indexed calculator);
    event BondVerified(uint256 indexed bondId, bool isVerified);
    event ReputationUpdated(address indexed user, uint32 reputation);
    event CouponPaid(uint256 indexed bondId, address indexed holder, uint32 amount);
    
    constructor(address _verifier, address _analyticsProvider) {
        owner = msg.sender;
        verifier = _verifier;
        analyticsProvider = _analyticsProvider;
    }
    
    function issueBond(
        string memory _name,
        string memory _symbol,
        string memory _description,
        uint256 _faceValue,
        uint256 _couponRate,
        uint256 _maturityPeriod,
        uint256 _totalSupply
    ) public returns (uint256) {
        require(bytes(_name).length > 0, "Bond name cannot be empty");
        require(bytes(_symbol).length > 0, "Bond symbol cannot be empty");
        require(_faceValue > 0, "Face value must be positive");
        require(_couponRate > 0, "Coupon rate must be positive");
        require(_maturityPeriod > 0, "Maturity period must be positive");
        require(_totalSupply > 0, "Total supply must be positive");
        
        uint256 bondId = bondCounter++;
        uint256 maturityDate = block.timestamp + _maturityPeriod;
        uint256 couponPaymentDate = block.timestamp + 365 days; // Annual coupon payments
        
        bonds[bondId] = Bond({
            bondId: FHE.asEuint32(0), // Will be set properly later
            faceValue: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            currentPrice: FHE.asEuint32(0), // Will be set to face value initially
            couponRate: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            maturityPeriod: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            totalSupply: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            availableSupply: FHE.asEuint32(0), // Will be set to total supply initially
            isActive: true,
            isVerified: false,
            name: _name,
            symbol: _symbol,
            description: _description,
            issuer: msg.sender,
            issueDate: block.timestamp,
            maturityDate: maturityDate,
            couponPaymentDate: couponPaymentDate
        });
        
        emit BondIssued(bondId, msg.sender, _name);
        return bondId;
    }
    
    function purchaseBond(
        uint256 bondId,
        externalEuint32 quantity,
        externalEuint32 price,
        bytes calldata inputProof
    ) public payable returns (uint256) {
        require(bonds[bondId].issuer != address(0), "Bond does not exist");
        require(bonds[bondId].isActive, "Bond is not active");
        require(bonds[bondId].isVerified, "Bond must be verified");
        
        uint256 holdingId = holdingCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalQuantity = FHE.fromExternal(quantity, inputProof);
        euint32 internalPrice = FHE.fromExternal(price, inputProof);
        
        // Check if sufficient supply is available
        ebool hasEnoughSupply = FHE.gte(bonds[bondId].availableSupply, internalQuantity);
        require(FHE.decrypt(hasEnoughSupply), "Insufficient bond supply");
        
        holdings[holdingId] = BondHolding({
            holdingId: FHE.asEuint32(0), // Will be set properly later
            bondId: FHE.asEuint32(0), // Will be set to actual bondId
            quantity: internalQuantity,
            purchasePrice: internalPrice,
            holder: msg.sender,
            purchaseDate: block.timestamp,
            isEncrypted: true
        });
        
        // Update bond available supply
        bonds[bondId].availableSupply = FHE.sub(bonds[bondId].availableSupply, internalQuantity);
        
        // Update encrypted balance
        euint32 totalCost = FHE.mul(internalQuantity, internalPrice);
        encryptedBalance[msg.sender] = FHE.add(encryptedBalance[msg.sender], totalCost);
        
        emit BondPurchased(holdingId, bondId, msg.sender, 0); // Quantity will be decrypted off-chain
        return holdingId;
    }
    
    function executeTrade(
        uint256 bondId,
        externalEuint32 quantity,
        externalEuint32 price,
        address seller,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(bonds[bondId].issuer != address(0), "Bond does not exist");
        require(bonds[bondId].isActive, "Bond is not active");
        require(seller != address(0), "Invalid seller address");
        require(seller != msg.sender, "Cannot trade with yourself");
        
        uint256 tradeId = tradeCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalQuantity = FHE.fromExternal(quantity, inputProof);
        euint32 internalPrice = FHE.fromExternal(price, inputProof);
        
        trades[tradeId] = Trade({
            tradeId: FHE.asEuint32(0), // Will be set properly later
            bondId: FHE.asEuint32(0), // Will be set to actual bondId
            quantity: internalQuantity,
            price: internalPrice,
            buyer: msg.sender,
            seller: seller,
            timestamp: block.timestamp,
            isSettled: false
        });
        
        // Update bond current price
        bonds[bondId].currentPrice = internalPrice;
        
        emit TradeExecuted(tradeId, bondId, msg.sender, seller, 0); // Quantity will be decrypted off-chain
        return tradeId;
    }
    
    function updateAnalytics(
        uint256 bondId,
        externalEuint32 totalVolume,
        externalEuint32 averagePrice,
        externalEuint32 priceVolatility,
        externalEuint32 liquidityScore,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(msg.sender == analyticsProvider, "Only analytics provider can update analytics");
        require(bonds[bondId].issuer != address(0), "Bond does not exist");
        
        uint256 analyticsId = analyticsCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalTotalVolume = FHE.fromExternal(totalVolume, inputProof);
        euint32 internalAveragePrice = FHE.fromExternal(averagePrice, inputProof);
        euint32 internalPriceVolatility = FHE.fromExternal(priceVolatility, inputProof);
        euint32 internalLiquidityScore = FHE.fromExternal(liquidityScore, inputProof);
        
        analytics[analyticsId] = EncryptedAnalytics({
            analyticsId: FHE.asEuint32(0), // Will be set properly later
            totalVolume: internalTotalVolume,
            averagePrice: internalAveragePrice,
            priceVolatility: internalPriceVolatility,
            liquidityScore: internalLiquidityScore,
            isCalculated: true,
            calculator: msg.sender,
            timestamp: block.timestamp
        });
        
        emit AnalyticsUpdated(analyticsId, bondId, msg.sender);
        return analyticsId;
    }
    
    function verifyBond(uint256 bondId, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify bonds");
        require(bonds[bondId].issuer != address(0), "Bond does not exist");
        
        bonds[bondId].isVerified = isVerified;
        emit BondVerified(bondId, isVerified);
    }
    
    function updateReputation(address user, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        // Determine if user is investor or issuer based on context
        if (bonds[bondCounter - 1].issuer == user) {
            issuerReputation[user] = reputation;
        } else {
            investorReputation[user] = reputation;
        }
        
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function payCoupon(uint256 bondId, address holder, euint32 amount) public {
        require(bonds[bondId].issuer == msg.sender, "Only issuer can pay coupons");
        require(bonds[bondId].isActive, "Bond must be active");
        require(block.timestamp >= bonds[bondId].couponPaymentDate, "Coupon payment not due");
        
        // Update coupon payment date for next year
        bonds[bondId].couponPaymentDate = bonds[bondId].couponPaymentDate + 365 days;
        
        emit CouponPaid(bondId, holder, 0); // FHE.decrypt(amount) - will be decrypted off-chain
    }
    
    function getBondInfo(uint256 bondId) public view returns (
        string memory name,
        string memory symbol,
        string memory description,
        uint8 faceValue,
        uint8 currentPrice,
        uint8 couponRate,
        uint8 totalSupply,
        uint8 availableSupply,
        bool isActive,
        bool isVerified,
        address issuer,
        uint256 issueDate,
        uint256 maturityDate
    ) {
        Bond storage bond = bonds[bondId];
        return (
            bond.name,
            bond.symbol,
            bond.description,
            0, // FHE.decrypt(bond.faceValue) - will be decrypted off-chain
            0, // FHE.decrypt(bond.currentPrice) - will be decrypted off-chain
            0, // FHE.decrypt(bond.couponRate) - will be decrypted off-chain
            0, // FHE.decrypt(bond.totalSupply) - will be decrypted off-chain
            0, // FHE.decrypt(bond.availableSupply) - will be decrypted off-chain
            bond.isActive,
            bond.isVerified,
            bond.issuer,
            bond.issueDate,
            bond.maturityDate
        );
    }
    
    function getHoldingInfo(uint256 holdingId) public view returns (
        uint8 quantity,
        uint8 purchasePrice,
        address holder,
        uint256 purchaseDate
    ) {
        BondHolding storage holding = holdings[holdingId];
        return (
            0, // FHE.decrypt(holding.quantity) - will be decrypted off-chain
            0, // FHE.decrypt(holding.purchasePrice) - will be decrypted off-chain
            holding.holder,
            holding.purchaseDate
        );
    }
    
    function getTradeInfo(uint256 tradeId) public view returns (
        uint8 quantity,
        uint8 price,
        address buyer,
        address seller,
        uint256 timestamp,
        bool isSettled
    ) {
        Trade storage trade = trades[tradeId];
        return (
            0, // FHE.decrypt(trade.quantity) - will be decrypted off-chain
            0, // FHE.decrypt(trade.price) - will be decrypted off-chain
            trade.buyer,
            trade.seller,
            trade.timestamp,
            trade.isSettled
        );
    }
    
    function getAnalyticsInfo(uint256 analyticsId) public view returns (
        uint8 totalVolume,
        uint8 averagePrice,
        uint8 priceVolatility,
        uint8 liquidityScore,
        bool isCalculated,
        address calculator,
        uint256 timestamp
    ) {
        EncryptedAnalytics storage analyticsData = analytics[analyticsId];
        return (
            0, // FHE.decrypt(analyticsData.totalVolume) - will be decrypted off-chain
            0, // FHE.decrypt(analyticsData.averagePrice) - will be decrypted off-chain
            0, // FHE.decrypt(analyticsData.priceVolatility) - will be decrypted off-chain
            0, // FHE.decrypt(analyticsData.liquidityScore) - will be decrypted off-chain
            analyticsData.isCalculated,
            analyticsData.calculator,
            analyticsData.timestamp
        );
    }
    
    function getInvestorReputation(address investor) public view returns (uint8) {
        return 0; // FHE.decrypt(investorReputation[investor]) - will be decrypted off-chain
    }
    
    function getIssuerReputation(address issuer) public view returns (uint8) {
        return 0; // FHE.decrypt(issuerReputation[issuer]) - will be decrypted off-chain
    }
    
    function getEncryptedBalance(address user) public view returns (uint8) {
        return 0; // FHE.decrypt(encryptedBalance[user]) - will be decrypted off-chain
    }
    
    function redeemBond(uint256 bondId, uint256 holdingId) public {
        require(bonds[bondId].issuer != address(0), "Bond does not exist");
        require(holdings[holdingId].holder == msg.sender, "Only holder can redeem");
        require(block.timestamp >= bonds[bondId].maturityDate, "Bond has not matured");
        require(bonds[bondId].isActive, "Bond must be active");
        
        // Mark bond as inactive if all bonds are redeemed
        // In a real implementation, this would check if all bonds are redeemed
        bonds[bondId].isActive = false;
        
        // Transfer face value to holder
        // Note: In a real implementation, funds would be transferred based on decrypted face value
        // payable(msg.sender).transfer(faceValue);
    }
}
