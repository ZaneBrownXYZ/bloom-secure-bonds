# Vercel Deployment Guide for Bloom Secure Bonds

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com) if you don't have an account
2. **GitHub Repository**: Ensure your code is pushed to GitHub
3. **Environment Variables**: Prepare the required environment variables

## Step-by-Step Deployment Process

### Step 1: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click on "New Project" or "Import Project"
3. Connect your GitHub account if not already connected
4. Select the `ZaneBrownXYZ/bloom-secure-bonds` repository

### Step 2: Configure Project Settings

1. **Project Name**: `bloom-secure-bonds` (or your preferred name)
2. **Framework Preset**: Select "Vite"
3. **Root Directory**: Leave as default (./)
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. **Install Command**: `npm install`

### Step 3: Environment Variables Configuration

Add the following environment variables in the Vercel dashboard:

#### Required Environment Variables:

```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=your_sepolia_rpc_url
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_INFURA_API_KEY=your_infura_api_key
```

#### How to Add Environment Variables:

1. In your Vercel project dashboard, go to "Settings"
2. Click on "Environment Variables" in the left sidebar
3. Click "Add New"
4. For each variable:
   - **Name**: Enter the variable name (e.g., `NEXT_PUBLIC_CHAIN_ID`)
   - **Value**: Enter the variable value (e.g., `11155111`)
   - **Environment**: Select "Production", "Preview", and "Development"
5. Click "Save" for each variable

### Step 4: Build Configuration

1. **Build Command**: `npm run build`
2. **Output Directory**: `dist`
3. **Install Command**: `npm install`
4. **Node.js Version**: 18.x (recommended)

### Step 5: Domain Configuration (Optional)

1. Go to "Domains" in your project settings
2. Add a custom domain if desired
3. Configure DNS settings as instructed by Vercel

### Step 6: Deploy

1. Click "Deploy" button
2. Wait for the build process to complete
3. Your application will be available at the provided Vercel URL

## Post-Deployment Configuration

### Step 7: Verify Deployment

1. **Check Build Logs**: Ensure no errors during build
2. **Test Application**: Visit the deployed URL
3. **Wallet Connection**: Test wallet connection functionality
4. **Environment Variables**: Verify all environment variables are loaded

### Step 8: Custom Domain (Optional)

1. **Add Domain**: In project settings, go to "Domains"
2. **Configure DNS**: Follow Vercel's DNS configuration instructions
3. **SSL Certificate**: Vercel automatically provides SSL certificates

## Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check Node.js version (should be 18.x)
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Environment Variables Not Loading**:
   - Ensure variables start with `NEXT_PUBLIC_`
   - Check variable names are correct
   - Redeploy after adding new variables

3. **Wallet Connection Issues**:
   - Verify WalletConnect Project ID is correct
   - Check RPC URL is accessible
   - Ensure network configuration is correct

### Build Configuration File (vercel.json)

The project includes a `vercel.json` file with the correct configuration:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite"
}
```

## Monitoring and Analytics

1. **Vercel Analytics**: Enable in project settings
2. **Performance Monitoring**: Use Vercel's built-in monitoring
3. **Error Tracking**: Check function logs for errors

## Security Considerations

1. **Environment Variables**: Never commit sensitive keys to repository
2. **HTTPS**: Vercel provides automatic HTTPS
3. **CORS**: Configure CORS settings if needed for API calls

## Deployment Checklist

- [ ] Repository connected to Vercel
- [ ] Environment variables configured
- [ ] Build settings correct
- [ ] Domain configured (if custom)
- [ ] SSL certificate active
- [ ] Application accessible
- [ ] Wallet connection working
- [ ] All features tested

## Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **GitHub Issues**: Create issues in the repository
- **Community Support**: Vercel Discord community

## Additional Notes

- The application uses Vite as the build tool
- All environment variables are prefixed with `NEXT_PUBLIC_` for client-side access
- The application is configured for Ethereum Sepolia testnet
- RainbowKit is used for wallet connection
- FHE (Fully Homomorphic Encryption) contracts are deployed separately

## Deployment URL

Once deployed, your application will be available at:
`https://bloom-secure-bonds.vercel.app` (or your custom domain)

## Next Steps After Deployment

1. **Test All Features**: Ensure all functionality works
2. **Configure Analytics**: Set up monitoring
3. **Update Documentation**: Keep README updated
4. **Monitor Performance**: Check for any performance issues
5. **Security Audit**: Review security settings
