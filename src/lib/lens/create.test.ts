import _ from 'lodash';
import { createClient } from './client';
import { jest, describe, expect, it, beforeAll } from "@jest/globals";
import { createPost, createComment } from "./create";
import { LensClient, Profile, RelayerResultFragment, 
  isRelayerResult,
  PublicationMainFocus,
  PublicationMetadataDisplayTypes, 
  PublicationMetadataV2Input} from "@lens-protocol/client";
import { v4 as uuidv4 } from 'uuid';

import { ethers } from "ethers";
import {  uploadWithValues } from '../storage/file';
import { createProfile } from './utils';


jest.setTimeout(5*60*1000);



describe("create", () => {
    let lensClient: LensClient;

    let profileId: string;
    const wallet = ethers.Wallet.createRandom();

    const address = wallet.address

    beforeAll(async ()=>{
        lensClient = await createClient(wallet);
        
        // lensClient is an authenticated instance of LensClient

        // const profileCreateResult = await lensClient.profile.create({ 
        //   handle
        //     // other request args 
        // });


        // const profileCreateResultValue = profileCreateResult.unwrap();
        
        // if (!isRelayerResult(profileCreateResultValue)) {
        //   console.log(`Something went wrong`, profileCreateResultValue);
        //   return;
        // }

        // console.log('profileCreateResultValue', profileCreateResultValue)

        // await lensClient.transaction.waitForIsIndexed(profileCreateResultValue.txId);


        // const allOwnedProfiles = await lensClient.profile.fetchAll({
        //   ownedBy: [address],
        // });

        // const profile = _.first(allOwnedProfiles.items);
        // profileId = profile?.['id'] || '';
        // console.log('allOwned',address,profileId, JSON.stringify(allOwnedProfiles.items));
        
        // const lensterUrl = 'https://testnet.lenster.xyz/u/'+handle;

        // console.log('lensterUrl', lensterUrl, 'profileId', profileId);
        
        // const dispatcherResults = await setDispatcher(lensClient, wallet, profileId)

        // console.log('set dispatcher success', dispatcherResults)
        const handlePrefix = '';
        const handle = (handlePrefix || 'w3btest')+ _.random(1, 10000);
        await createProfile(lensClient, wallet, handle);
      })
  it("create", async () => {
    // seems cid wrapped in directory is not supported. ensure configure at file client

    // const imageUrl = 'ipfs://bafybeig2gaxisstynvnlze55dpub7apzusy33kapge2ehk7jlkftaycss4/clean1.jpg';

    const imageUrl = 'https://ipfs.io/ipfs/bafybeig2gaxisstynvnlze55dpub7apzusy33kapge2ehk7jlkftaycss4/clean1.jpg'
    const { txId, txHash, contentMetadata} = await createPost(imageUrl, wallet, profileId, lensClient);

    const txUrl = `https://mumbai.polygonscan.com/address/${txHash}`
    console.log('createdPost with', contentMetadata, txUrl)


   await lensClient.transaction.waitForIsIndexed(txId);

    const request = {
      profileId
    }

    const allPublications = await lensClient.publication.fetchAll(request);


    console.log('allPublications', JSON.stringify(allPublications.items));


    // console.log(results.items);
    expect(allPublications.items.length>0).toEqual(true);


  });

  it('createComment', async ()=>{
    const { txId, txHash, contentMetadata} = await createComment(wallet, profileId, lensClient,
      {

      });

    const txUrl = `https://mumbai.polygonscan.com/address/${txHash}`
    console.log('createdPost with', contentMetadata, txUrl)

  })
});
