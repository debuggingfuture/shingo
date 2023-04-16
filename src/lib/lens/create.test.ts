import _ from 'lodash';
import { createClient } from './client';
import { jest, describe, expect, it, beforeAll } from "@jest/globals";
import { createPost, createComment } from "./create";
import { LensClient, Profile, RelayerResultFragment, 
  isRelayerResult,
  PublicationMainFocus,
  PublicationMetadataDisplayTypes, 
  PublicationMetadataV2Input} from "@lens-protocol/client";

import { ethers } from "ethers";
import {  uploadWithValues } from '../storage/file';
import { createProfile, getProfileUrl } from './utils';

import { createPost, createComment } from "./create";

jest.setTimeout(5*60*1000);



describe("create", () => {
    let lensClient: LensClient;

    let profileId: string;
  
    let handle: string;
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
        handle = (handlePrefix || 'w3btest')+ _.random(1, 10000);
       const createdProfile =  await createProfile(lensClient, wallet, handle);

       if(createdProfile){
        profileId = (createdProfile.profileId as string);

       }
        
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

  it.only('createComment with text', async ()=>{
    const testPublicationId = '0x773d-0x01';
    const {
      contentURI,
      contentMetadata,
      viaDispatcherResult
    } = await createComment(testPublicationId, wallet, profileId, {

      })


    const {txId, txHash} = viaDispatcherResult.unwrap() as RelayerResultFragment;
    const txUrl = `https://mumbai.polygonscan.com/address/${txHash}`
    console.log('createComment with profileId', profileId, getProfileUrl(handle, "replies"), contentMetadata, txUrl)

    await lensClient.transaction.waitForIsIndexed(txId);


  })


  it.only('createComment with image', async ()=>{
    const testPublicationId = '0x773d-0x01';
    const {
      contentURI,
      contentMetadata,
      viaDispatcherResult
    } = await createComment(testPublicationId, wallet, profileId, {
      mainContentFocus: PublicationMainFocus.Image,
      content: `Turtle comes back`,
    media :[
      {
        type: 'image/jpeg',
        altTag: 'image',
        // can be ipfs:// or https:
        item: 'http://images.fineartamerica.com/images-medium-large/green-turtle-laying-eggs-alexis-rosenfeld.jpg'
      }
    ],   
      })


    const {txId, txHash} = viaDispatcherResult.unwrap() as RelayerResultFragment;
    const txUrl = `https://mumbai.polygonscan.com/address/${txHash}`
    console.log('createComment with profileId', profileId, getProfileUrl(handle, "replies"), contentMetadata, txUrl)

    await lensClient.transaction.waitForIsIndexed(txId);

  })


});
