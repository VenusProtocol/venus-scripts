const { BigNumber } = require("bignumber.js");
const { open } = require("fs/promises");


function dec(amount, decimals) {
  return new BigNumber(amount.toString()).div(new BigNumber(10).pow(decimals));
}

function pr(amount, decimals) {
  const mantissa = new BigNumber(10).pow(new BigNumber(36).minus(decimals))
  return new BigNumber(amount.toString()).div(mantissa);
}

function writeJson(fileName, data) {
  console.log(JSON.stringify(data), null, 2);
}

async function writeCsv(fileName, data, columns) {
  const file = await open(fileName, "w");
  file.write(columns.join(';') + "\n");
  for (const row of data) {
    const line = columns.map(key => row[key]);
    await file.write(line.join(';') + "\n");
  }
  await file.close();
}

async function save(fileName, data, columns) {
  if (/\.csv$/.test(fileName)) {
    writeCsv(fileName, data, columns);
  } else if (/\.json$/.test(fileName)) {
    writeJson(fileName, data);
  } else {
    throw new Error("Unknown output file format, only .csv and .json files are supported");
  }
}

module.exports = { save, dec, pr };
