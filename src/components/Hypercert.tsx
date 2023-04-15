import React, { useEffect, useState } from 'react';
import { Alchemy, AssetTransfersCategory, Network } from "alchemy-sdk";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LinkIcon from '@mui/icons-material/Link';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import SensorsIcon from '@mui/icons-material/Sensors';

export const useNFTCard = () => {
    const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_TOKEN_OPTIMISM;
    const settings = {
        apiKey, // Replace with your Alchemy API Key.

        //tricky need eth insetaed
        network: Network.ETH_GOERLI
        // network: Network.OPT_GOERLI, // Replace with your network.
    };
    const hypercertContract = '0x822F17A9A5EeCFd66dBAFf7946a8071C265D1d07';

    const organizerAddress = '0xdcc2219d36ef0c1b646335785108ba100ddd9c62';
    const [nfts, setNfts] = useState([])
    useEffect(() => {
        new Alchemy(settings).nft.getNftsForOwner(organizerAddress, {
            contractAddresses: [hypercertContract]
        })
            .then((results) => {
                setNfts(results?.ownedNfts as never[]);
                // console.log('nfts', nfts, results);
                // setNfts(nfts)
            });


        // new Alchemy(settings).core.getAssetTransfers({
        //     fromBlock: "0x0",
        //     //not user but the "NGO"
        //     toAddress: '0xdcc2219d36ef0c1b646335785108ba100ddd9c62',
        //     fromAddress: '0x0000000000000000000000000000000000000000',
        //     excludeZeroValue: true,
        //     category: [AssetTransfersCategory.ERC721, AssetTransfersCategory.ERC1155],
        //     withMetadata: true
        // })
        //     .then((results) => {
        //         setNfts(nfts)
        //     });

    }, []);

    return {
        nfts
    }
}

export const HypercertCard = ({ nftMetadata }) => {
    console.log('nftMetadata', nftMetadata)
    const { nfts } = useNFTCard();


    if (nfts?.length < 1) {
        return <></>
    }
    const [nft] = nfts;

    const { title, description, media, tokenId } = nft;
    // const url = nft?.media?.url

    return <div>
        <Card >
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        W3
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={title}
                subheader="by web3beach.eth"
            />
            <CardMedia
                component="img"
                height="194"
                image={media?.[0]?.thumbnail}
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon style={{ color: "#07111c" }} />
                </IconButton>
                <IconButton aria-label="add to favorites">
                    <SensorsIcon style={{ color: "#07111c" }} />
                </IconButton>
                <IconButton aria-label="share">

                    <ShareIcon style={{ color: "#07111c" }} />
                </IconButton>
                <a href="" target="_blank">
                    <IconButton style={{ color: "gray !important" }} aria-label="etherscan">
                        <svg class="" fill="#04111D" height="20" viewBox="0 0 293.775 293.671" width="20" xmlns="http://www.w3.org/2000/svg"><g id="etherscan-logo-circle" transform="translate(-219.378 -213.33)"><path d="M280.433,353.152A12.45,12.45,0,0,1,292.941,340.7l20.737.068a12.467,12.467,0,0,1,12.467,12.467v78.414c2.336-.692,5.332-1.43,8.614-2.2a10.389,10.389,0,0,0,8.009-10.11V322.073a12.469,12.469,0,0,1,12.468-12.47h20.778a12.469,12.469,0,0,1,12.467,12.467v90.279s5.2-2.106,10.269-4.245a10.408,10.408,0,0,0,6.353-9.577V290.9a12.466,12.466,0,0,1,12.466-12.467h20.778A12.468,12.468,0,0,1,450.815,290.9v88.625c18.014-13.055,36.271-28.758,50.759-47.639a20.926,20.926,0,0,0,3.185-19.537,146.6,146.6,0,0,0-136.644-99.006c-81.439-1.094-148.744,65.385-148.736,146.834a146.371,146.371,0,0,0,19.5,73.45,18.56,18.56,0,0,0,17.707,9.173c3.931-.346,8.825-.835,14.643-1.518a10.383,10.383,0,0,0,9.209-10.306V353.152" data-name="Path 1" id="Path_1"></path><path d="M244.417,398.641A146.808,146.808,0,0,0,477.589,279.9c0-3.381-.157-6.724-.383-10.049-53.642,80-152.686,117.4-232.79,128.793" data-name="Path 2" id="Path_2" transform="translate(35.564 80.269)"></path></g></svg>
                    </IconButton>
                </a>



            </CardActions>

        </Card>
    </div>

}