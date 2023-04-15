const result = await lensClient.publication.allWalletsWhoCollected({
    publicationId: "0x01-0x01",
  });


  const walletList = ['0x']


  superfluid.distribute('gnosis safe address', walletList)