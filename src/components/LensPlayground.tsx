
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon } from 'wagmi/chains';

import { publicProvider } from 'wagmi/providers/public'
const { provider, webSocketProvider } = configureChains([polygon, mainnet], [publicProvider()]);
import { Profile } from './Profile';
import { LensConfig, LensProvider, PublicationMetadataFilters, staging } from '@lens-protocol/react-web';
import { usePublications, useFeed, useExplorePublications, useSearchPublications } from '@lens-protocol/react-web';
import { Card, CardHeader, CardMedia, CardContent, Grid, } from '@mui/material';
import _ from 'lodash';
import { bindings as wagmiBindings } from '@lens-protocol/wagmi';
import CauseCard from './CauseCard';
import { Publication } from '@lens-protocol/client';
import { PublicationSearchResultItem } from '@lens-protocol/client/dist/declarations/src/graphql/types.generated';

const lensConfig: LensConfig = {
    bindings: wagmiBindings(),
    environment: staging,
};

const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
});

const metadataFilter: PublicationMetadataFilters = {
    // restrictPublicationMainFocusTo?: PublicationMainFocus[];
    // restrictPublicationLocaleTo?: string;
    // showPublicationsWithContentWarnings?: {
    //   oneOf: PublicationContentWarning[];
    // };
    restrictPublicationTagsTo:
    {
        all: ["beachsignal"]
    }
}

// const metadataFilter = {};

const CardList = ({ publications }: { publications: any[] }) => {


    // const data = _.range(0, 3);

    // let _publications = data.map(d => {
    //     return { "__typename": "Post", "id": "0x7725-0x01", "stats": { "__typename": "PublicationStats", "totalAmountOfMirrors": 0, "totalUpvotes": 0, "totalDownvotes": 0, "totalAmountOfCollects": 0, "totalAmountOfComments": 0, "commentsCount": 0 }, "metadata": { "__typename": "MetadataOutput", "animatedUrl": null, "name": "Post created with LensClient SDK", "description": null, "mainContentFocus": "TEXT_ONLY", "content": "test content", "image": null, "media": [], "attributes": [], "encryptionParams": null }, "profile": { "__typename": "Profile", "id": "0x7725", "name": null, "bio": null, "handle": "w3btest4161.test", "ownedBy": "0xe3426FD15a9D4341d00Ae6273771d381A39C8E70", "interests": [], "picture": null, "coverPicture": null, "stats": { "__typename": "ProfileStats", "totalCollects": 0, "totalComments": 0, "totalFollowers": 0, "totalFollowing": 0, "totalMirrors": 0, "totalPosts": 1, "totalPublications": 1, "commentsCount": 0, "postsCount": 0, "mirrorsCount": 0 }, "followModule": null, "followPolicy": { "type": "ANYONE" }, "__attributes": [], "attributes": {}, "dispatcher": { "__typename": "Dispatcher", "address": "0x6C1e1bC39b13f9E0Af9424D76De899203F47755F", "canUseRelay": true }, "onChainIdentity": { "__typename": "OnChainIdentity", "proofOfHumanity": false, "ens": { "__typename": "EnsOnChainIdentity", "name": null }, "sybilDotOrg": { "__typename": "SybilDotOrgIdentity", "verified": false, "source": { "__typename": "SybilDotOrgIdentitySource", "twitter": { "__typename": "SybilDotOrgTwitterIdentity", "handle": null } } }, "worldcoin": { "__typename": "WorldcoinIdentity", "isHuman": false } }, "isFollowedByMe": false, "isFollowingObserver": false, "followStatus": null, "ownedByMe": false }, "collectedBy": null, "collectModule": { "__typename": "RevertCollectModuleSettings", "contractAddress": "0x5E70fFD2C6D04d65C3abeBa64E93082cfA348dF8" }, "collectNftAddress": null, "referenceModule": null, "createdAt": "2023-04-15T10:40:55.000Z", "hidden": false, "isGated": false, "reaction": null, "hasCollectedByMe": false, "canComment": { "__typename": "CanCommentResponse", "result": false }, "canMirror": { "__typename": "CanMirrorResponse", "result": false }, "mirrors": [], "canObserverDecrypt": { "__typename": "CanDecryptResponse", "result": false, "reasons": ["MISSING_ENCRYPTION_PARAMS"] }, "hasOptimisticCollectedByMe": false, "isOptimisticMirroredByMe": false, "collectPolicy": { "type": "NO_COLLECT", "state": "CANNOT_BE_COLLECTED" }, "referencePolicy": { "type": "ANYONE" }, "decryptionCriteria": null } as unknown as Publication
    // })

    return (
        <div>
            <Grid container>
                {
                    publications.map((publication) => {
                        return (
                            <Grid className="item">
                                <CauseCard publication={publication} />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </div>
    )
}

const Feed = () => {
    const {
        data: publications,
        loading,
        hasMore,
        next,
    } = useExplorePublications({
        // profileId: '0x7241DDDec3A6aF367882eAF9651b87E1C7549Dff',
        limit: 10,
        metadataFilter
    });

    if (!publications) {
        return <div />
    }


    return <div>

        <CardList publications={publications} />

        {JSON.stringify(publications[0])}

    </div>
}

export const LensPlayground = () => {
    return (
        <div>lens container
            <WagmiConfig client={client}>
                <Profile />
                <LensProvider config={lensConfig}>
                    lens content


                    <Feed />
                </LensProvider>
            </WagmiConfig>

        </div>
    )

}