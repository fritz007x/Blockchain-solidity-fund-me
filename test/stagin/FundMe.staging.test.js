const { getNamedAccounts, ethers, network } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")
const { assert } = require("chai")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", async function () {
          let fundMe
          let deployer
          const sendValue = ethers.utils.parseEther("0.1")

          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              fundMe = await ethers.getContract("FundMe", deployer)
          })
          it("Allows fund and withdraw", async function () {
              const fundTxResp = await fundMe.fund({ value: sendValue })
              await fundTxResp.wait(1)
              const withdrawTxResp = await fundMe.withdraw()
              await withdrawTxResp.wait(1)
              const endingBalance = await fundMe.provider.getBalance(
                  fundMe.address
              )
              console.log(endingBalance.toString() + " debe ser igual 0")
              assert.equal(endingBalance.toString(), "0")
          })
      })
