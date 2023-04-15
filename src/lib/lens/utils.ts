import _ from 'lodash';
import { LensClient, development, isRelayerResult } from "@lens-protocol/client";
import { EthereumAddress } from "@lens-protocol/react-web";

import { ethers } from "ethers";
// we either 
// - query ownedby wallet address to find latest created
// - poll txn until indexed to get profileid

// replies
export const getProfileUrl = (handle:string, type="profile")=>{
    const lensterUrl = 'https://testnet.lenster.xyz/u/'+handle+"?type="+type;


    
    return {
      lensterUrl
    }
}


export const getPostUrl = (postId:string)=>{
  const lensterUrl = 'https://testnet.lenster.xyz/posts/'+postId;


  
  return {
    lensterUrl
  }
}


getPostUrl


// From official example, modify to wait with sdk instead,  mostly for testing
// https://github.com/lens-protocol/api-examples/blob/master/src/profile/create-profile.ts
// there is also lensClient.transaction.waitForIsIndexed

export const setDispatcher = async (lensClient: LensClient, wallet: ethers.Wallet,  profileId: string)=>{
    const typedDataResult = await lensClient.profile.createSetDispatcherTypedData({
      profileId: profileId,
    });
    
    // typedDataResult is a Result object
    const data = typedDataResult.unwrap();
    
    // sign with the wallet
    const signedTypedData = await wallet._signTypedData(
      data.typedData.domain,
      data.typedData.types,
      data.typedData.value
    );
    const broadcastResult = await lensClient.transaction.broadcast({
      id: data.id,
      signature: signedTypedData,
    });
    
    
  // broadcastResult is a Result object
  const broadcastResultValue = broadcastResult.unwrap();
  
  if (!isRelayerResult(broadcastResultValue)) {
    console.log(`Something went wrong`, broadcastResultValue);
    return;
  }
  
  console.log(
    `setDispatcher Transaction was successfuly broadcasted with txId ${broadcastResultValue.txId}`
  );
  
  }


export const createProfile = async (lensClient:LensClient, wallet: ethers.Wallet, handle: string) =>{
    const address = wallet.address;

    const profileCreateResult = await lensClient.profile.create({ 
      handle
        // other request args 
    });


    const profileCreateResultValue = profileCreateResult.unwrap();
    
    if (!isRelayerResult(profileCreateResultValue)) {
      console.log(`Something went wrong`, profileCreateResultValue);
      return;
    }

    console.log('profileCreateResultValue', profileCreateResultValue)

    await lensClient.transaction.waitForIsIndexed(profileCreateResultValue.txId);


    const allOwnedProfiles = await lensClient.profile.fetchAll({
      ownedBy: [address],
    });

    const profile = _.first(allOwnedProfiles.items);
    const profileId = profile?.['id'] || '';
    console.log('allOwned',address,profileId, JSON.stringify(allOwnedProfiles.items));
    
    const lensterUrl = 'https://testnet.lenster.xyz/u/'+handle;

    console.log('lensterUrl', lensterUrl, 'profileId', profileId);
    
    const dispatcherResults = await setDispatcher(lensClient, wallet, profileId)

    return {
        profileId,
        lensterUrl,
        dispatcherResults
    }
}