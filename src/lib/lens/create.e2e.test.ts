import { LensClient, development } from "@lens-protocol/client";
import { ethers } from "ethers";
import { jest, describe, expect, it, beforeAll } from "@jest/globals";
import { beforeEach, test } from "node:test";
import _, { map } from 'lodash'
import { createPost } from "./create";
import {createProfile } from './utils'
import { createClient } from "./client";

jest.setTimeout(60*1000)
describe("create", () => {
    const total = 5;
    let lensClient: LensClient;
    let wallets: ethers.Wallet[]  = Array(total);
    let profileIds: string[]  = Array(total);


        beforeAll(async ()=>{
            // TODO simulate avatars
            // avatarUrl: '',
        await Promise.all(
            _.range(0,total-1).map(async i=>{
                wallets[i] = ethers.Wallet.createRandom();

                lensClient = await createClient(wallets[i]);
                const handlePrefix = '';
                const handle = (handlePrefix || 'w3btest')+ _.random(1, 10000);
                const result = await createProfile(lensClient, wallets[i], handle);
                profileIds[i] = result?.profileId || '';
            })
        )       ;

       
    })
        
        
    it('create mocks posts with comments', async ()=>{

        const items = [
            {
            name: 'Cleanup at Singapore',
            // date: '2021-09-01',

            comments :[
                {
                    name: 'evaluation on water',
                    description: 'best ever'
                },
                {
                    name: 'evaluation on Turtle',
                    description: 'this helps turtle'
                },
                {
                    name: 'evaluation on Co2',
                    description: 'amazing'
                }
            ]
          
        },
        // {
        //     name: 'Cleanup at Tokyo',  
        //     date: '2022-06-01',
        // },
        // {
        //     name: 'Cleanup at Tegucigalpa',   
        //     date: '2022-06-01',
        // },
        // {
        //     name: 'Cleanup at Hong Kong',   
        //     date: '2022-05-01',
        // },

        // {
        //     name: 'Cleanup at Fukuoka',   
        //     date: '2022-11-03',
        // },
        // {
        //     name: 'Cleanup at Osaka',   
        //     date: '2023-02-01',
        // },
        
        ];
        
    
        await Promise.all(items.map(async(metadata, i)=>{
            const imageUrl = `https://ipfs.io/ipfs/bafybeig2gaxisstynvnlze55dpub7apzusy33kapge2ehk7jlkftaycss4/clean${i}.jpg`
            const { txId, txHash, contentMetadata} = await createPost(imageUrl, wallets[i], profileIds[i], 
                
                _.omit(metadata, ['comments', 'date'])
                
            );
                
            const txUrl = `https://mumbai.polygonscan.com/address/${txHash}`
            console.log('createdPost with', contentMetadata, txUrl)

            const results = await lensClient.transaction.waitForIsIndexed(txId);

            console.log('results', results)

            return { txId, txHash, contentMetadata}
        }));

    })
   
})
   
