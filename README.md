# Venus scripts

This repo contains some useful scripts to get data about Venus at a particuar block.

## Installation

`npm install` should do the trick. Use node >= 14.

## Usage

Before running the scripts, you should set `BSC_ARCHIVE_NODE` as an environment variable or in the `.env` file. Feel free to check `.env.example` for the inspiration.

Currently, there are the following scripts:

* `get-reserves` – returns the reserves snapshot at a particular block
* `get-treasury-vtokens` – returns the amount of vTokens in treasury at a particular block

You can run the scripts with `./venus <command> <outputFile>`. You can optionally specify a network and a fork block number with `-n <networkName>` and `-b <blockNumber>` respectively, but note that forking at a specific block is only supported for `hardhat` network.

Note that these scripts are not optimized and may take some time to run :)
