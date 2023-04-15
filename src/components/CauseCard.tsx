import { PublicationSearchResultItem } from '@lens-protocol/client/dist/declarations/src/graphql/types.generated';
import { Card, CardHeader, CardMedia, CardContent, Avatar, } from '@mui/material';

// export const upVote = async (lensClient:, profileId, publicationId) => {

//   // after wallet connect

//   // const result = await lensClient.reactions.add({

//   //   reaction: ReactionTypes.Upvote,
//   // });
// }

export const CauseCard = ({ publication }: { publication: any }) => {

  console.log('publication', publication);
  return <Card className="w-72 h-72">
    <CardHeader
      // action={
      //   <IconButton aria-label="settings">
      //     <MoreVertIcon />
      //   </IconButton>
      // }
      title={publication.metadata.name}
      subheader={publication.metadata.name}
    />
    <CardMedia
      component="img"
      width="400"
      height="600"
      image={publication?.metadata?.media?.[0]?.original.url}
      alt="Paella dish"
    />
    Upvotes: {publication?.stats?.totalUpvotes}
    Collects: {publication?.stats?.totalAmountOfCollects}
    <Avatar alt="Remy Sharp" src={publication?.profile?.picture?.original?.url || "https://files.readme.io/a0959e6-lens-logo1.svg"} />
    {publication.profile.name || publication.profile.handle}
    {publication.metadata.content}
  </Card>
}

export default CauseCard;