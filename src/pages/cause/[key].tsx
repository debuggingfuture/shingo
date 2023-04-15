// import Image from 'next/image'
import MuiImage from 'mui-image';


import { Inter } from 'next/font/google'
import Grid from '@mui/material/Grid'
import { Avatar, Button } from '@mui/material'
import Typography from '@mui/material/Typography';
import { EndorseCard } from '~/components/EndorseCard'

import { HypercertCard } from '~/components/Hypercert'

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
    const { key = "1" } = props;
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
            <Typography variant="h3" gutterBottom>
                Clean the Beach
            </Typography>
            <Grid
                container
                direction="row"

                textAlign="center"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs={4} justifyContent="center" alignItems="center">
                    <HypercertCard nftMetadata={{}} />

                </Grid>
            </Grid>
            <Grid container>
                <Typography variant="h2" gutterBottom>
                    Hypercert
                </Typography>

            </Grid>


            <Grid container>
                <Typography variant="h3" gutterBottom>
                    Signal others this is important
                </Typography>
                <Button variant="contained" color="success">
                    Signal by Collect NFT
                </Button>
            </Grid>

            <Grid container>
                <Typography variant="h3" gutterBottom>
                    Volunteer
                </Typography>
                <Button variant="contained" color="success">
                    I want to Volunteer
                </Button>
            </Grid>


            <Grid container>

                <Grid container item direction="row" xs={8} justifyContent="flex-start" alignItems="flex-start">
                    Endorsed by
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />

                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                </Grid>


                <Grid container item direction="row" xs={8} justifyContent="flex-start" alignItems="flex-start">

                </Grid>

            </Grid>

            <Grid container >
                <Endorsements endorsements={[]} />
            </Grid>
        </>
    )
}
