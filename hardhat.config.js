require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
   hardhat: {
      chainId: 56,
      forking: {
        url: process.env['BSC_ARCHIVE_NODE'],
        blockNumber: parseInt(process.env['SIM_BLOCK_NUMBER'])
      }
    }
  }
};
