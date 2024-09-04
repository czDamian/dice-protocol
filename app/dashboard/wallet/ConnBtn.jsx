"use client";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { Web3 } from "web3";

const web3 = new Web3(Web3.givenProvider);

export const ConnBtn = () => {
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [loading, setLoading] = useState(false);

  const eraseCookie = (name) => {
    Cookies.remove(name);
  };

  const connectWallet = async () => {
    try {
      setLoading(true);

      if (!window.ethereum) {
        alert(
          "MetaMask is not installed. Please install it to use this feature."
        );
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const chainId = await window.ethereum.request({ method: "eth_chainId" });

      const address = accounts[0];

      if (address && address.startsWith("0x")) {
        try {
          const response = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ walletAddress: address }),
          });

          if (!response.ok) {
            throw new Error(`Failed to register: ${response.statusText}`);
          }

          const data = await response.json();
          Cookies.set("userInfo", JSON.stringify(data));
        } catch (apiError) {
          console.error("Error during API request:", apiError);
          setAccount(null);
          eraseCookie("userInfo");
          alert("Failed to register user. Please try again.");
        }
      }

      setAccount(address);
      setChainId(chainId);
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      alert(
        "Failed to connect to wallet. Please check your MetaMask extension."
      );
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    if (window.confirm("Are you sure you want to disconnect your wallet?")) {
      setAccount(null);
      setChainId(null);
      eraseCookie("userInfo");
      console.log("Wallet disconnected.");
      window.location.reload();
    }
  };

  useEffect(() => {
    const savedUserInfo = Cookies.get("userInfo");
    if (savedUserInfo) {
      const savedAddress = JSON.parse(savedUserInfo).walletAddress;
      setAccount(savedAddress);
      connectWallet();
    }

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else {
        setAccount(accounts[0]);
      }
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, []);

  return (
    <div className="mt-20 md:mt-0">
      {loading ? (
        <button
          type="button"
          className="bg-gradient-to-r from-[#E5760E] to-[#F68CFF] text-stone-700 font-bold rounded-full py-3 px-6"
          disabled
        >
          Connecting...
        </button>
      ) : (
        <button
          onClick={account ? disconnectWallet : connectWallet}
          type="button"
          className="bg-gradient-to-r from-[#E5760E] to-[#F68CFF] text-stone-700 font-bold rounded-full py-3 px-6"
        >
          {account
            ? `Disconnect (${account.slice(0, 6)}...${account.slice(-4)})`
            : "Connect Wallet"}
        </button>
      )}
    </div>
  );
};
