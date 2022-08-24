const { getComptroller, getAllMarkets } = require("../lib/venus");
const { save, dec } = require("../lib/util");


const columns = [
  'symbol',
  'vTokenAddress',
  'vTokenBalance',
  'vTokenBalanceMantissa',
];

async function getTreasuryVTokens(fileName) {
  const comptroller = await getComptroller();
  const allMarkets = await getAllMarkets(comptroller);
  const treasury = await comptroller.treasuryAddress();
  const result = [];
  for (const vToken of allMarkets) {
    const vTokenBalanceMantissa = await vToken.balanceOf(treasury);
    const symbol = await vToken.symbol();
    const vTokenBalance = dec(vTokenBalanceMantissa, 8).toString();
    const row = {
      vTokenAddress: vToken.address,
      symbol,
      vTokenBalance,
      vTokenBalanceMantissa: vTokenBalanceMantissa.toString()
    };
    result.push(row);
    console.log(`We have ${vTokenBalance} ${symbol} in treasury`)
  }
  await save(fileName, result, columns);
}

module.exports = { getTreasuryVTokens };
