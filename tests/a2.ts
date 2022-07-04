/* Imports ----------------------------------------------------------------- */

import {
  pair_to_json,
  bool_to_json,
  string_to_json,
  bigint_to_json,
  list_to_json,
  set_to_json,
  parameters,
  option_to_json
} from "./micheline";

const Completium = require('@completium/completium-cli');

/* transferlist ------------------------------------------------------------ */

export interface transferlist_value {
  unrestricted : boolean
  allowedlists : Set<bigint>
}

export const transferlist_value_to_json = (v : transferlist_value) => {
  pair_to_json(bool_to_json(v.unrestricted), set_to_json<bigint>(v.allowedlists, bigint_to_json))
}

/* assertTransfers argument ------------------------------------------------ */

const input_list_to_json = (input_list : Array<[ string, Array<string> ]>) => {
  input_list.map(x => {
    return pair_to_json(string_to_json(x[0]), x[1].map(y => {
      return string_to_json(y)
    }))
  })
}

/* assertTransferlist argument --------------------------------------------- */

const assertTransferlist_arg_to_json = (transferlistId : bigint, input: transferlist_value | undefined) => {
  pair_to_json(bigint_to_json(transferlistId), option_to_json<transferlist_value>(input, transferlist_value_to_json))
}

/* updateUser argument ----------------------------------------------------- */

const updateUser_arg_to_json = (uaddr : string, transferlistId: bigint | undefined) => {
  pair_to_json(string_to_json(uaddr), option_to_json<bigint>(transferlistId, bigint_to_json))
}

/* updateTransferlist argument --------------------------------------------- */

export interface update_param {
  up_unrestricted : boolean
  up_disallow     : Array<bigint>
  up_allow        : Set<bigint>
}

const update_param_to_json = (v : update_param) => {
  return pair_to_json(bool_to_json(v.up_unrestricted), pair_to_json(list_to_json<bigint>(v.up_disallow, bigint_to_json), set_to_json<bigint>(v.up_allow, bigint_to_json)))
}

const updateTransferlist_arg_to_json = (transferlistId : bigint, oup : update_param | undefined) => {
  pair_to_json(bigint_to_json(transferlistId), option_to_json<update_param>(oup, update_param_to_json))
}

/* A2 ---------------------------------------------------------------------- */

export class A2 {
  contract : any
  get_address() : string | undefined {
    if (this.contract != undefined) {
      return this.contract.address
    }
    return undefined
  }
  async deploy(owner : string,  issuer : string, params : Partial<parameters>) {
    const [a2_contract, _] = await Completium.deploy(
      './contracts/a2_simple.arl', {
        parameters: {
          owner: owner,
          issuer: issuer,
        },
        as: params.as,
        amount: params.amount ? params.amount.toString()+"utz" : undefined
      }
    )
    this.contract = a2_contract
  }
  async pause(params : Partial<parameters>) {
    if (this.contract != undefined) {
      await this.contract.pause({
        as: params.as,
        amount: params.amount ? params.amount.toString()+"utz" : undefined
      });
    }
  }
  async unpause(params : Partial<parameters>) {
    if (this.contract != undefined) {
      await this.contract.unpause({
        as: params.as,
        amount: params.amount ? params.amount.toString()+"utz" : undefined
      });
    }
  }
  async set_metadata(k : string, d: string | undefined, params : Partial<parameters>) {
    if (this.contract != undefined) {
      await this.contract.set_metadata({
        arg: {
          k : k,
          d : d
        },
        as: params.as,
        amount: params.amount ? params.amount.toString()+"utz" : undefined
      });
    }
  }
  async declare_ownership(candidate : string | undefined, params : Partial<parameters>) {
    if (this.contract != undefined) {
      await this.contract.declare_ownership({
        arg: {
          candidate : candidate
        },
        as: params.as,
        amount: params.amount ? params.amount.toString()+"utz" : undefined
      });
    }
  }
  async claim_ownership(params : Partial<parameters>) {
    if (this.contract != undefined) {
      await this.contract.claim_ownership({
        as: params.as,
        amount: params.amount ? params.amount.toString()+"utz" : undefined
      });
    }
  }
  async assertReceivers(addrs : Array<string>, params : Partial<parameters>) {
    if (this.contract != undefined) {
      await this.contract.assertReceivers({
        arg: {
          addrs : addrs
        },
        as: params.as,
        amount: params.amount ? params.amount.toString()+"utz" : undefined
      });
    }
  }
  async assertTransfers(input_list : Array<[ string, Array<string> ]>, params : Partial<parameters>) {
    if (this.contract != undefined) {
      await this.contract.assertTransfers({
        argJsonMichelson: input_list_to_json(input_list),
        as: params.as,
        amount: params.amount ? params.amount.toString()+"utz" : undefined
      });
    }
  }
  async assertTransferlist(transferlistId : bigint, input: transferlist_value | undefined, params : Partial<parameters>) {
    if (this.contract != undefined) {
      await this.contract.assertTransferlist({
        argJsonMichelson: assertTransferlist_arg_to_json(transferlistId, input),
        as: params.as,
        amount: params.amount ? params.amount.toString()+"utz" : undefined
      });
    }
  }
  async updateUser(uaddr : string, transferlistId: bigint | undefined, params : Partial<parameters>) {
    if (this.contract != undefined) {
      await this.contract.updateUser({
        argJsonMichelson: updateUser_arg_to_json(uaddr, transferlistId),
        as: params.as,
        amount: params.amount ? params.amount.toString()+"utz" : undefined
      });
    }
  }
  async updateTransferlist(transferlistId : bigint, oup : update_param | undefined, params : Partial<parameters>) {
    if (this.contract != undefined) {
      await this.contract.updateTransferlist({
        argJsonMichelson: updateTransferlist_arg_to_json(transferlistId, oup),
        as: params.as,
        amount: params.amount ? params.amount.toString()+"utz" : undefined
      });
    }
  }
  async setIssuer(value : string, params : Partial<parameters>) {
    if (this.contract != undefined) {
      await this.contract.setIssuer({
        arg: value,
        as: params.as,
        amount: params.amount ? params.amount.toString()+"utz" : undefined
      });
    }
  }
  errors = {
    EXISTS_TRANSFERLIST        :  "EXISTS_TRANSFERLIST",
    FROM_RESTRICTED            :  "FROM_RESTRICTED",
    INVALID_UNRESTRICTED_STATE :  "INVALID_UNRESTRICTED_STATE",
    IS_NOT_SUBSET              :  "IS_NOT_SUBSET",
    ISSUER_NOT_USER            :  "ISSUER_NOT_USER",
    LIST_NOT_FOUND             :  "LIST_NOT_FOUND",
    TO_NOT_ALLOWED             :  "TO_NOT_ALLOWED",
    TO_RESTRICTED              :  "TO_RESTRICTED",
    TRANSFERLIST_NOT_FOUND     :  "TRANSFERLIST_NOT_FOUND",
    USER_NOT_FOUND             :  "USER_NOT_FOUND",
    USER_RESTRICTED            :  "USER_RESTRICTED",
  }

}
