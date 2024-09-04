//not needed
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Dice Protocol",
  projectId: "a4f81593df883ff67bf3f1654a065b63",
  chains: [mainnet, polygon, optimism, arbitrum],
  ssr: true,
});