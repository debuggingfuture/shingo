import { describe, expect, it } from "@jest/globals";
import { hello } from "./hello";
describe("hello", () => {
  it("should hello", async () => {
    expect(hello()).toEqual('hello');
  });
});
