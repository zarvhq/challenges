const { sum } = require("./index");

describe("sum", () => {
  it("should return the sum of two numbers", () => {
    expect(sum(1, 2)).toEqual(3);
  });
});
