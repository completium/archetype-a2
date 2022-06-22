const {
  deploy,
  expectToThrow,
  exprMichelineToJson,
  getAccount,
  getValueFromBigMap,
  jsonMichelineToExpr,
  runGetter,
  setEndpoint,
  setMockupNow,
  setQuiet,
} = require('@completium/completium-cli');
const { errors, getBalance, getAllowance } = require('./utils');
const assert = require('assert');

// contracts
let a2_storage;
let a2;

// accounts
const alice = getAccount('alice');
const bob = getAccount('bob');
const carl = getAccount('carl');
const user1 = getAccount('bootstrap1');
const user2 = getAccount('bootstrap2');
const user3 = getAccount('bootstrap3');
const user4 = getAccount('bootstrap4');

//set endpointhead
setEndpoint('mockup');

setQuiet(true);
const timestamp_now = Math.floor(Date.now() / 1000)
setMockupNow(timestamp_now)

describe('[A2] Contract deployment', async () => {
  it('A2 contract deployment should succeed', async () => {
    [a2_storage, _] = await deploy(
      './contracts/a2_storage.arl',
      {
        parameters: {
          owner: alice.pkh,
        },
        as: alice.pkh,
      }
    );
    [a2, _] = await deploy(
      './contracts/a2.arl',
      {
        parameters: {
          owner: alice.pkh,
          a2_storage: a2_storage.address,
        },
        as: alice.pkh,
      }
    );
  });
});
