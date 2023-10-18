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
        url: process.env.BSC_ARCHIVE_NODE,
        blockNumber: block === "latest" ? undefined : parseInt(block)
      }
    },
    bsctestnet: {
      url: process.env.BSC_ARCHIVE_NODE,
      chainId: 97,
    },
    bscmainnet: {
      url: process.env.BSC_ARCHIVE_NODE,
      chainId: 56,
    },
  }
};
