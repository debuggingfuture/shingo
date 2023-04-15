// import Image from 'next/image'
import MuiImage from 'mui-image';
import { createProfile, getProfileUrl, getPostUrl } from '~/lib/lens/utils';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';


import { Inter } from 'next/font/google'
import Grid from '@mui/material/Grid'
import { Avatar, Button } from '@mui/material'
import Typography from '@mui/material/Typography';
import { EndorseCard } from '~/components/EndorseCard'
import { usePublications, useFeed, useExplorePublications, useSearchPublications } from '@lens-protocol/react-web';
import { HypercertCard } from '~/components/Hypercert'
import { createFilter } from '~/components/create-publication-filter';
import { useActiveProfile, useActiveWallet, useWalletLogout } from '@lens-protocol/react-web';
import { CommentEditor } from '~/components/CommentEditor';
// import CleanImage from '../../public/clean1.jpg'

const inter = Inter({ subsets: ['latin'] })

export const Endorsements = ({ endorsements }: { endorsements: any[] }) => {
    const _endorsements = [0, 1, 2];
    return <Grid item>
        {
            _endorsements.map(endorsement => {
                return <EndorseCard endorsement={endorsement} />
            })
        }
    </Grid>

}

export default function Cause(props: any) {
    const { key } = props;



    const {
        data: publications,
        loading,
        hasMore,
        next,
    } = useExplorePublications({
        limit: 10,
        metadataFilter: createFilter({
            postId: key
        })
    });

    const { data: profile } = useActiveProfile()
    console.log('profile', profile?.handle);

    const handle = profile?.handle
    // if (!key) {
    //     return <div />
    // }


    if (!publications) {
        return <div />
    }

    console.log('publications', publications);

    // const { lensterUrl } = getProfileUrl(handle)

    const { lensterUrl: lensterPostUrl } = getPostUrl(key)


    return (
        <>
            <Grid container direction="row" justifyContent="center" alignItems="center">
                <Grid item xs={12} >
                    <img src="https://pbs.twimg.com/media/Fs4xEZXWIAEc6h-?format=jpg&name=large" width="100%" height="50%" />
                    {/* <MuiImage
                        // src={CleanImage}
                        src="https://pbs.twimg.com/media/Fs4xEZXWIAEc6h-?format=jpg&name=large"
                        alt="Clean"
                        // fit="cover"
                        // fill="false"
                        // sizes="(max-width: 768px) 80vw,
                        // (max-width: 1200px) 50vw,
                        // 33vw"
                        showLoading={false}
                        // duration={
                        //     3000
                        // }
                        // easing="ease-in"

                        width="100%"
                        height="100%"
                    // priority
                    /> */}

                </Grid>

            </Grid>

            <Grid
                container
                direction="column"
                textAlign="center"
                justif yContent="space-around"
                alignItems="center"
            >
                <Grid item >
                    <Typography variant="h4" gutterBottom>
                        Clean the Beach
                    </Typography>
                    <a href={lensterPostUrl} target="_blank">
                        <IconButton style={{ width: '35px' }} aria-label="Lenster">
                            <img src="https://testnet.lenster.xyz/logo.svg" />
                        </IconButton>
                    </a>
                </Grid>
                <Grid container
                    columnSpacing={0}

                    // justifyContent="center"
                    justifyContent="space-around"
                >
                    <Grid item xs={3} justifyContent="center" alignItems="center">
                        <HypercertCard nftMetadata={{}} />

                    </Grid>
                    <Grid item xs={6} sx={{ border: 1 }}
                        columnSpacing={36}
                        justifyContent="center" alignItems="center">
                        <Grid container direction="column">
                            <Grid item>
                                <Typography variant="h6" gutterBottom>
                                    Signal others this is important
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="success">
                                    Signal by Collect NFT
                                </Button>
                            </Grid>
                        </Grid>




                        <Grid container direction="column">
                            <Grid item>
                                <Typography variant="h6" gutterBottom>
                                    Volunteer
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="success">
                                    I want to Volunteer
                                </Button>
                            </Grid>


                        </Grid>
                        <br />
                        <Grid container justifyContent="center"
                            direction="column"
                            alignItems="center">
                            <Grid item>
                                <Typography variant="h6" gutterBottom>
                                    Sessions
                                </Typography>
                            </Grid>
                            <Grid item xs={10}>
                                Sessions
                                Friday, April 28, 2023 at 6:00 PM to Friday, April 28, 2023 at 9:00 PM EDT
                                BlackRock Park Avenue Plaza Atrium
                                55 E. 52nd Street, Between Park & Madison Avenue · New York, NY

                            </Grid>
                        </Grid>



                    </Grid>

                </Grid>



            </Grid>
            {/* <Grid container>
                <Typography variant="h4" gutterBottom>
                    Hypercert
                </Typography>
            </Grid> */}



            <Grid container>

                <Grid container item direction="row" xs={8} justifyContent="flex-start" alignItems="flex-start">
                    Endorsed by
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />

                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                </Grid>



                <CommentEditor />


                <Grid container item direction="row" xs={8} justifyContent="flex-start" alignItems="flex-start">

                </Grid>

            </Grid>




            <br />



            <Grid container >
                <Endorsements endorsements={[]} />
            </Grid>
        </>
    )
}
