import _ from 'lodash';
import { createClient } from './client';
import { jest, describe, expect, it, beforeAll } from "@jest/globals";
import { ethers } from "ethers";
import { LensClient, Profile, RelayerResultFragment, 
  isRelayerResult,
  PublicationMainFocus,
  PublicationMetadataDisplayTypes, 
  PublicationMetadataV2Input} from "@lens-protocol/client";
import { v4 as uuidv4 } from 'uuid';

import { EthereumAddress } from '@lens-protocol/react-web';
import { uploadWithValues } from '../storage/file';
import { RelayerResult } from '@lens-protocol/client/dist/declarations/src/graphql/types.generated';


export const createPost = async (imageUrl: string, wallet: ethers.Wallet, profileId: string, metadata={}) => {
    const lensClient = await createClient(wallet);

    const contentMetadata:PublicationMetadataV2Input  = {
        // version: PublicationMetadataVersions.one,
        attributes: [
          // {
          //   displayType: PublicationMetadataDisplayTypes.String,
          //   traitType: "Created with",
          //   value: "LensClient SDK",
          // },
        ],
        version: '2.0.0',
        metadata_id: uuidv4(),
        locale: 'en-US',
        external_url: null,
        image: null,
        imageMimeType: null,
        name: "Post created with LensClient SDK",
        tags: [ "beachsignalv2145"],
  
        // mainContentFocus: PublicationMainFocus.TextOnly,
        content: `Our #ImpactOnboarding meetup trained 35 teachers in Emergency First Response while introducing them to 
@ethereum
, L2 
@optimismFND
, web3 wallet setup/ security, Dapps, NFT, SBT, DAO, and Proof of Stake. 🧵

#RoadToDevcon #EthLatAm #OpLatAm 
@Galaxisxyz
  
@EF_ESP
 
@EthereumHN`,
  
        mainContentFocus: PublicationMainFocus.Image,
        media :[
          {
            type: 'image/jpeg',
            altTag: 'image',
            // can be ipfs:// or https:
            item: imageUrl
            // item: 'https://pbs.twimg.com/media/Fs4xCTGWYAULIW_?format=jpg&name=large'
          }
        ],
        ...metadata
      }
  
      // need the index as in file name
      const cid =  await uploadWithValues([contentMetadata])
      // seems cid wrapped in directory is not supported. ensure configure at file client
  
      const contentURI = `ipfs://${cid}`;
  
      console.log('contentURI', contentURI, JSON.stringify(contentMetadata))
  
  
    const validateResult = await lensClient.publication.validateMetadata(contentMetadata);
     
  
      if(!validateResult.valid){
        throw new Error('invalid metadata');
      }
  
      const viaDispatcherResult = await lensClient.publication.createPostViaDispatcher({
        profileId,
        contentURI,
        collectModule: {
          revertCollectModule: true, // collect disabled
        },
        referenceModule: {
          followerOnlyReferenceModule: false, // anybody can comment or mirror
        },
      });
  
      console.log('viaDispatcherResult', viaDispatcherResult.unwrap());
      // console.log('viaDispatcherResult', viaDispatcherResult.unwrap()['reason']);


      return {
        ...viaDispatcherResult.unwrap()  as RelayerResult,
        contentMetadata
      }
      
}