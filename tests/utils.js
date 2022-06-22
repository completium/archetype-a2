const { isMockup, getValueFromBigMap, exprMichelineToJson, packTyped, blake2b, sign, keccak } = require('@completium/completium-cli');
const { BigNumber } = require('bignumber.js');
const assert = require('assert');

exports.getUsers = async (c, pkh) => {
  const storage = await c.getStorage();
  return await getValueFromBigMap(
    parseInt(storage),
    exprMichelineToJson(`"${pkh}"`),
    exprMichelineToJson(`address`)
  )
}

exports.errors = {
  USER_RESTRICTED: '"USER_RESTRICTED"',
  USER_GETOPT_INTERNAL_ERROR: '"USER_GETOPT_INTERNAL_ERROR"',
  TO_TRANSFERLIST_NOT_FOUND: '"TO_TRANSFERLIST_NOT_FOUND"',
  TO_TRANSFERLIST_NOT_FOUND_IN_FROM: '"TO_TRANSFERLIST_NOT_FOUND_IN_FROM"',
  TO_RESTRICTED: '"TO_RESTRICTED"',
  TO_NOT_ALLOWED: '"TO_NOT_ALLOWED"',
  TO_INVALID_UNRESTRICTED_STATE: '"TO_INVALID_UNRESTRICTED_STATE"',
  INVALID_CALLER: '"INVALID_CALLER"',
  INTERNAL_ERROR: '"INTERNAL_ERROR"',
  FROM_TRANSFERLIST_NOT_FOUND: '"FROM_TRANSFERLIST_NOT_FOUND"',
  FROM_RESTRICTED: '"FROM_RESTRICTED"',
  FROM_INVALID_UNRESTRICTED_STATE: '"FROM_INVALID_UNRESTRICTED_STATE"',
  CONTRACT_PAUSED: '"CONTRACT_PAUSED"',
  CONTRACT_NOT_PAUSED: '"CONTRACT_NOT_PAUSED"',
}
