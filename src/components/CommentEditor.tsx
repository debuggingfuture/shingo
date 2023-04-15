import { PublicationId, publicationId } from '@lens-protocol/react-web';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
// import { UnauthenticatedFallback } from '~/components/UnauthenticatedFallback';
// import { WhenLoggedInWithProfile } from '~/components/auth';
import { CommentBox } from '~/components/CommentBox';
// import { PublicationComments } from '~/components/PublicationComments';

export function CommentEditor({ publicationId }: { publicationId: string }) {
  // const [publicationId, setPublicationId] = useState<PublicationId>(publicationId);

  return (
    <Grid>
      <h1>Add Comment      </h1>
      <CommentBox />
      {/* <>
             <p>
               <label htmlFor="publicationId">Publication id</label>
               <input
                 id="publicationId"
                 type="text"
                 value={parentId}
                 onChange={(event) => setParentId(publicationId(event.target.value))}
               />
             </p>

             {parentId && (
               <>
                 <CommentComposer publisher={profile} publicationId={parentId} />

                 <p>Publication comments:</p>
                 <PublicationComments publicationId={parentId} />
               </>
             )}
           </>
         )} */}

      {/* </WhenLoggedInWithProfile>
       <UnauthenticatedFallback message="Log in to create a comment." /> */}
    </Grid >
  );
}
