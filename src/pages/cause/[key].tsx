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

            <Grid
                container

                direction="column"
                textAlign="center"
                justifyContent="center"
                justifyContent="space-around"
                alignItems="center"
            >
                <Grid item >
                    <Typography variant="h4" gutterBottom>
                        Clean the Beach
                    </Typography>
                </Grid>
                <Grid container
                    columnSpacing={0}
                    // justifyContent="center"
                    justifyContent="space-around"
                >
                    <Grid item xs={3} justifyContent="center" alignItems="center">
                        <HypercertCard nftMetadata={{}} />

                    </Grid>
                    <Grid item xs={6} sx={{ border: 1 }} justifyContent="center" alignItems="center">
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


                    </Grid>

                </Grid>

                {/* <Grid item xs={2}>
                    Sessions
                    Friday, April 28, 2023 at 6:00 PM to Friday, April 28, 2023 at 9:00 PM EDT
                    BlackRock Park Avenue Plaza Atrium
                    55 E. 52nd Street, Between Park & Madison Avenue · New York, NY

                </Grid> */}

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
