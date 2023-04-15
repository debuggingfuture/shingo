import _ from 'lodash';
import { createClient } from './client';
import { jest, describe, expect, it, beforeAll } from "@jest/globals";
import { create } from "./create";
import { LensClient, Profile, RelayerResultFragment, isRelayerResult } from "@lens-protocol/client";

jest.setTimeout(5*60*1000);

import { ethers } from "ethers";

describe("collect", () => {
    test('abc', ()=>{
        console.log('aaa')
    })
});