'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { ReactNode , useEffect  } from 'react';
import {toSolanaWalletConnectors} from '@privy-io/react-auth/solana';

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    localStorage.removeItem('privy:embedded-wallet:iframe-ready');
    localStorage.removeItem('privy:embedded-wallet:ready');
  }, []);

  const solanaConnectors = toSolanaWalletConnectors({
    // By default, shouldAutoConnect is enabled
    shouldAutoConnect: true,
  });
  

  return (
    <PrivyProvider 
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
        config={{
        "appearance": {
          "accentColor": "#6A6FF5",
          "theme":"#FFFFFF",
          "showWalletLoginFirst": false,
          "logo": "https://auth.privy.io/logos/privy-logo.png",
          "walletChainType": 'solana-only',
          "walletList": [
            "phantom"
          ]
        },
        "externalWallets": {
          "solana": {
            "connectors": solanaConnectors,
          },
        },
        "loginMethods": [
          "email",
          "wallet"
        ],
        "embeddedWallets": {
          "createOnLogin": "all-users",
          "requireUserPasswordOnCreate": false,
          "showWalletUIs": true
        },
        "mfa": {
          "noPromptOnMfaRequired": false
        }
      }}
      >
        {children}
      </PrivyProvider>
  );
}