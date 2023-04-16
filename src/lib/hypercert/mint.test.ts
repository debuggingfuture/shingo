import { jest, describe, expect, it, beforeAll } from "@jest/globals";
import { mint } from "./mint";

jest.setTimeout(60 * 1000);
describe("mint", () => {
  it("should create hypercert", async () => {
    const results = await mint();
    console.log("mint", results);
    // https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-optimism-mainnet
  });
});
