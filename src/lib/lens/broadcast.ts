    // const typedDataResult = await lensClient.publication.createPostTypedData({
//         profileId,
//         contentURI,
//         collectModule: {
//           // feeCollectModule: {
//           //   amount: {
//           //     currency: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
//           //     value: '0.01'
//           //   },
//           //   followerOnly: false,
//           //   /** The collect module recipient address */
//           //   recipient: '0xdcc2219d36ef0c1b646335785108ba100ddd9c62',
//           //   /** The collect module referral fee */
//           //   referralFee: 0.2
//           // }, 
          
//           freeCollectModule: { followerOnly: true },


//           // create metadata
//           // on chain
          
//           // collect disabled,
//           // revertCollectModule: true   m, .                                           /
//         },
//         referenceModule: {
//           followerOnlyReferenceModule: false, // anybody can comment or mirror
//         },
//       });


          

//     const data = typedDataResult.unwrap();

    
//     // sign with the wallet
//     const signedTypedData = await wallet._signTypedData(
//       data.typedData.domain,
//       data.typedData.types,
//       data.typedData.value
//     );

//     // broadcast
//     const broadcastResult = await lensClient.transaction.broadcast({
//       id: data.id,
//       signature: signedTypedData,
//     });

//     // broadcastResult is a Result object
// const broadcastResultValue = broadcastResult.unwrap();

//     if (!isRelayerResult(broadcastResultValue)) {
//       console.log(`Something went wrong`, broadcastResultValue);
//       return;
//     }
    
//     console.log(
//       `Transaction was successfuly broadcasted with txId ${broadcastResultValue.txId}, ${broadcastResultValue.txHash}, `
//     );