require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

const block = process.env['SIM_BLOCK_NUMBER'];

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
   hardhat: {
      chainId: 56,
      forking: {
        url: "https://bsc-mainnet.nodereal.io/v1/ba380d7666604315bf64626983685899",
        blockNumber: block === "latest" ? undefined : parseInt(block)
      }
    }
  }
};
