import { formatCurrency } from "../../js/utils/money.js";
/* global describe, it, expect */
describe("testsuite: Format currency", () => {
  it("format currency to dollar", () => {
    expect(formatCurrency(2095)).toEqual("21.00");
    
  });
  it("0 cent to dollar",()=>{
    expect(formatCurrency(0)).toEqual("0.00");
  })
  it("edge case",()=>{
    expect(formatCurrency(10001)).toEqual("100.00");
  })
});
