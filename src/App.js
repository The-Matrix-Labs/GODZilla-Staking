import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.css";

import "@rainbow-me/rainbowkit/styles.css";
import { Router, Location } from "@reach/router";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
const PosedRouter = ({ children }) => (
  <Location>
    {({ location }) => (
      <div id="routerhang">
        <div key={location.key}>
          <Router location={location} class="new_1">
            {children}
          </Router>
        </div>
      </div>
    )}
  </Location>
);

function App() {
  return (
    <div class="full_width">
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <PosedRouter>
            <Dashboard exact path="/" />
          </PosedRouter>
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}

export default App;
