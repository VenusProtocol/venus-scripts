const { BigNumber } = require("bignumber.js");
const { deployment, getComptroller, getOracle, getAllMarkets, getUnderlying } = require("../lib/venus");
const { dec, pr } = require("../lib/util");


function printCsv(input) {
  const header = [
    'symbol',
    'vToken',
    'underlying',
    'reservesMantissa',
    'reserves',
    'decimals',
    'price',
    'usdValue'
  ];
  console.log(header.join(';'));
  for (line of input) {
    const { symbol, vToken, underlying, reservesMantissa, reserves, decimals, price, usdValue } = line;
    console.log([symbol, vToken, underlying, reservesMantissa, reserves, decimals, price, usdValue].join(';'));
  }
}

async function getReserves() {
  console.log("Hello!");
  const comptroller = await getComptroller();
  console.log("Let me get some reserves for you!");
  const oracle = await getOracle(comptroller);
  console.log("I got the oracle");
  const allMarkets = await getAllMarkets(comptroller);
  console.log("and the markets");
  const result = [];
  for (const vToken of allMarkets) {
    console.log("and now I'm getting the reserves of some coin");
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
    console.log(`${symbol}, to be precise`);
    if (['CAN', 'LUNA', 'UST'].includes(symbol)) {
      continue;
    }
    const price = await oracle.getUnderlyingPrice(vToken.address);
    console.log(`Ok, ${symbol} costs ${pr(price, decimals)}`);
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
  }
  printCsv(result);
}

getReserves()
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
