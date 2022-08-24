const { ethers } = require("hardhat");

const comptrollerAbi = require("./abi/comptroller.json");
const vTokenAbi = require("./abi/vToken.json");
const oracleAbi = require("./abi/oracle.json");
const erc20Abi = require("./abi/erc20.json");


const deployment = {
  unitroller: "0xfD36E2c2a6789Db23113685031d7F16329158384",
  vBnb: "0xA07c5b74C9B40447a954e1466938b865b6BBea36"
}

async function getComptroller() {
  return ethers.getContractAt(comptrollerAbi, deployment.unitroller);
}

async function getOracle(comptroller) {
  return ethers.getContractAt(oracleAbi, await comptroller.oracle());
}

async function getAllMarkets(comptroller) {
  const allMarkets = await comptroller.getAllMarkets();
  return Promise.all(allMarkets.map(address => ethers.getContractAt(vTokenAbi, address)));
}

async function getUnderlying(vToken) {
  if (vToken.address === deployment.vBnb) {
    throw new Error("vBNB does not have an underlying ERC-20");
  }
  const underlyingAddress = await vToken.underlying();
  return ethers.getContractAt(erc20Abi, underlyingAddress);
}

module.exports = {
  deployment,
  getComptroller,
  getOracle,
  getAllMarkets,
  getUnderlying
};