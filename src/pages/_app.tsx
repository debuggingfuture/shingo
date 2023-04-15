import '~/styles/globals.css'
import type { AppProps } from 'next/app'
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';

import { ProfileMenu } from '../components/profile-menu'

import { Html, Head, Main, NextScript } from 'next/document'
import { Nav } from './nav'
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, goerli, sepolia, optimism, polygon } from "wagmi/chains";
import { publicProvider } from 'wagmi/providers/public'
const { provider, webSocketProvider } = configureChains([optimism, polygon, mainnet], [publicProvider()]);
import { LensConfig, LensProvider, PublicationMetadataFilters, staging } from '@lens-protocol/react-web';
import { usePublications, useFeed, useExplorePublications, useSearchPublications } from '@lens-protocol/react-web';
import { Card, CardHeader, CardMedia, CardContent, Grid, } from '@mui/material';
import { bindings as wagmiBindings } from '@lens-protocol/wagmi';

const lensConfig: LensConfig = {
  bindings: wagmiBindings(),
  environment: staging,
};

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});


let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <WagmiConfig client={client}>
        <LensProvider config={lensConfig}>

          <ProfileMenu />
          <Component {...pageProps} />
        </LensProvider>
      </WagmiConfig>
    </ThemeProvider>
  )
}

