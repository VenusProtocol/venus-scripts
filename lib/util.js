const { BigNumber } = require("bignumber.js");


function dec(amount, decimals) {
  return new BigNumber(amount.toString()).div(new BigNumber(10).pow(decimals));
}

function pr(amount, decimals) {
  const mantissa = new BigNumber(10).pow(new BigNumber(36).minus(decimals))
  return new BigNumber(amount.toString()).div(mantissa);
}

function printJson(input) {
  console.log(JSON.stringify(input));
}

module.exports = { printJson, dec, pr };
