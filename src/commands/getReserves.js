const { BigNumber } = require("bignumber.js");
const { deployment, getComptroller, getOracle, getAllMarkets, getUnderlying } = require("../lib/venus");
const { dec, pr, save } = require("../lib/util");


const columns = [
  'symbol',
  'vToken',
  'underlying',
  'reservesMantissa',
  'reserves',
  'decimals',
  'price',
  'usdValue'
];

async function getReserves(fileName) {
  const comptroller = await getComptroller();
  const oracle = await getOracle(comptroller);
  const allMarkets = await getAllMarkets(comptroller);
  const result = [];
  for (const vToken of allMarkets) {
    const reserves = await vToken.totalReserves();
    let decimals;
    let symbol;
    let underlying = null;
    if (vToken.address === deployment.vBnb) {
      decimals = new BigNumber(18);
      symbol = 'BNB';
    } else {
      underlying = await getUnderlying(vToken);
      decimals = new BigNumber((await underlying.decimals()).toString());
      symbol = await underlying.symbol();
    }
    if (['CAN', 'LUNA', 'UST'].includes(symbol)) {
      continue;
    }
    const price = await oracle.getUnderlyingPrice(vToken.address);
    const decimalReserves = dec(reserves, decimals);
    const decimalPrice = pr(price, decimals);
    const row = {
      symbol: symbol,
      vToken: vToken.address,
      underlying: underlying ? underlying.address : "0x0",
      reservesMantissa: reserves.toString(),
      reserves: decimalReserves.toString(),
      decimals: decimals.toString(),
      price: decimalPrice.toString(),
      usdValue: (decimalReserves.multipliedBy(decimalPrice)).toString()
    };
    result.push(row);
    console.log(`${symbol} reserves are ${row.reserves} ($${row.usdValue})`)
  }
  await save(fileName, result, columns);
}

module.exports = { getReserves };
