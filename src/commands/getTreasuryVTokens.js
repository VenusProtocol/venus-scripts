const { BigNumber } = require("bignumber.js");
const { deployment, getUnderlying, getComptroller, getAllMarkets } = require("../lib/venus");
const { save, dec } = require("../lib/util");

const EXP_SCALE = new BigNumber(10).pow(new BigNumber(18));

const columns = [
  'symbol',
  'vTokenAddress',
  'vTokenBalance',
  'vTokenBalanceMantissa',
  'exchangeRateStored',
  'underlyingAddress',
  'underlyingDecimals',
  'underlyingAmount',
];

async function getTreasuryVTokens(fileName) {
  const comptroller = await getComptroller();
  const allMarkets = await getAllMarkets(comptroller);
  const treasury = await comptroller.treasuryAddress();
  const result = [];
  let decimals;
  
  for (const vToken of allMarkets) {
    let underlying = null;
    const vTokenBalanceMantissa = await vToken.balanceOf(treasury);
    const symbol = await vToken.symbol();
    const vTokenBalance = dec(vTokenBalanceMantissa, 8).toString();
    const exchangeRateStored = await vToken.exchangeRateStored();
    const underlyingAmount = new BigNumber(exchangeRateStored.toString()).multipliedBy(vTokenBalanceMantissa.toString()).div(EXP_SCALE);

    if (vToken.address === deployment.vBnb) {
      decimals = new BigNumber(18);
    } else {
      underlying = await getUnderlying(vToken);
      decimals = new BigNumber((await underlying.decimals()).toString());
    }

    const row = {
      vTokenAddress: vToken.address,
      symbol,
      vTokenBalance,
      vTokenBalanceMantissa: vTokenBalanceMantissa.toString(),
      exchangeRateStored: exchangeRateStored.toString(),
      underlyingAddress: underlying ? underlying.address : "0x0",
      underlyingDecimals: decimals,
      underlyingAmount: underlyingAmount.toFixed(0),
    };
    result.push(row);
    console.log(`We have ${vTokenBalance} ${symbol} in treasury`)
  }
  await save(fileName, result, columns);
}

module.exports = { getTreasuryVTokens };
