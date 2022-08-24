const { getComptroller, getAllMarkets } = require("../lib/venus");
const { printJson } = require("../lib/util");


async function getTreasuryVTokens() {
  const comptroller = await getComptroller();
  const allMarkets = await getAllMarkets(comptroller);
  const treasury = await comptroller.treasuryAddress();
  const result = [];
  for (const vToken of allMarkets) {
    const vTokenBalanceMantissa = await vToken.balanceOf(treasury);
    const symbol = await vToken.symbol();
    const row = {
      vTokenAddress: vToken.address,
      symbol,
      vTokenBalanceMantissa: vTokenBalanceMantissa.toString()
    };
    result.push(row);
  }
  printJson(result);
}

getTreasuryVTokens()
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
