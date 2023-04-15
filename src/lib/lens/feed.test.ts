import { describe, expect, it } from "@jest/globals";
import { queryFeed } from "./feed";
describe("feed", () => {
  it("should query ", async () => {
    const results = await queryFeed();

    console.log(results.items);
    expect(results).toEqual('hello');
  });
});
