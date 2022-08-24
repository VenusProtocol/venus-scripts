# Venus scripts

This repo contains some useful scripts to get data about Venus at a particuar block.

## Installation

`npm install` should do the trick. Use node >= 14.

## Usage

Before running the scripts, you should set `BSC_ARCHIVE_NODE` and `SIM_BLOCK_NUMBER` in your environment variables or `.env` file. Feel free to check `.env.example` for the inspiration.

Currently, there are the following scripts:

* `get-reserves` – returns the reserves snapshot at a particular block
* `get-treasury-vtokens` – returns the amount of vTokens in treasury at a particular block

You can run the scripts with either `npm run script_name` or `npx hardhat run scripts/script_name.js`.

Note that these scripts are not optimized and may take some time to run :)
