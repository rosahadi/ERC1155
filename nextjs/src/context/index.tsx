"use client";

import {
  wagmiAdapter,
  projectId,
  networks,
} from "@/config";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import { sepolia } from "@reown/appkit/networks";
import React, { type ReactNode } from "react";
import {
  cookieToInitialState,
  WagmiProvider,
  type Config,
} from "wagmi";
import { FloatingNav } from "@/components/ui/floating-navbar";

// Set up queryClient
const queryClient = new QueryClient();

// Set up metadata
const metadata = {
  name: "next-reown-appkit",
  description: "next-reown-appkit",
  url: "https://rosah.dev",
  icons: [
    "https://avatars.githubusercontent.com/u/179229932",
  ],
};

// Create the modal
export const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks,
  metadata,
  defaultNetwork: sepolia,
  themeMode: "dark",
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
  themeVariables: {
    "--w3m-accent": "#fff",
  },
});

function ContextProvider({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: string | null;
}) {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies
  );

  const handleConnectClick = () => {
    modal.open();
  };

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>
        <FloatingNav onClick={handleConnectClick} />

        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default ContextProvider;
