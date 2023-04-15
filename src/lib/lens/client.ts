import { LensClient, development } from "@lens-protocol/client";
import { ethers } from "ethers";


export const createClient = async (wallet: ethers.Wallet)=>{


    const lensClient = new LensClient({
        environment: development,
      });
      
      const address = await wallet.getAddress();
      
      const challenge = await lensClient.authentication.generateChallenge(address);
      const signature = await wallet.signMessage(challenge);
      
      await lensClient.authentication.authenticate(address, signature);
      
      // check the state with
      await lensClient.authentication.isAuthenticated();

      return lensClient;
}