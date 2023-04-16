// import { Client, cacheExchange, fetchExchange } from "urql";
import "isomorphic-fetch";
// import { gql } from "@urql/core";

import Web3 from "web3";
import { ethers } from "ethers";

const token = process.env.ALCHEMY_API_TOKEN;
const web3 = new Web3(
  "https://eth-goerli.g.alchemy.com/v2/" + token
);

import {
  // HypercertClaimdata,
  // HypercertMetadata,
  // HyperCertMinterFactory,
  HypercertMinting,
} from "@hypercerts-org/hypercerts-sdk/dist/index";

enum HypercertsChainConfigGraph {
  Testnet = "hypercerts-testnet",
  Mainnet = "hypercerts-optimism-mainnet",
}
export const mint = async () => {
  const network = "goerli";
  const provider = new ethers.providers.AlchemyProvider(
    network,
    token
  );

  const privateKey = process.env.TEST_PRIVATE_KEY || "";

  const signer = new ethers.Wallet(privateKey, provider);

  // misleading error as sdk will attempt to load with empty configs
  const { mintHypercert } = HypercertMinting({
    // provider: ethers.getDefaultProvider<BaseProvider>("goerli"),

    // workaround issue that sdk rejecting api provider to sign
    //  sending a transaction requires a signer (operation="sendTransaction", code=UNSUPPORTED_OPERATION, version=contracts/5.7.0)
    provider: signer as unknown as ethers.providers.BaseProvider,
    chainConfig: {
      // name: "goerli",
      chainID: "5",
      rpc: "https://eth-goerli.g.alchemy.com/v2/B9uKC7QU2u_EmAAWuMgtORW24w1cf3zT",
      // graph: HypercertsChainConfigGraph.Testnet,
      contractAddress: "0x822F17A9A5EeCFd66dBAFf7946a8071C265D1d07",
    },
    // | "optimism-mainnet",
  });
  // const properties: HypercertMetadata]"properties"] = {
  //   work_scope: {
  //     name: "web3beach.test",
  //   },
  //   impact_scope: {},
  //   work_timeframe: {},
  //   impact_timeframe: {},
  //   work_location: {},
  //   impact_location: {
  //     name: "tokyo",
  //   },
  //   contributors: {
  //     name: "carlos",
  //   },
  //   a: 1,
  // };
  const properties = [{}];
  const claimData = {
    name: "web3beach hypercert",
    description: "for ethglobal demo",
    image:
      "https://user-images.githubusercontent.com/1883877/232258566-b6b7b3fa-2381-451a-bdb0-00e05871c863.png",
    properties,
  };
  const address = process.env.TEST_ACCOUNT_ADDRESS || "";
  const results = await mintHypercert(address, claimData, 10000, 2);
  console.log("results", results);
  return results;
};
