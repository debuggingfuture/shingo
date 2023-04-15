import Image from 'next/image'
import { Inter } from 'next/font/google'
import { usePublications, useFeed, useExplorePublications, useSearchPublications, PublicationMetadataFilters } from '@lens-protocol/react-web';
import Grid from '@mui/material/Grid';
import _ from 'lodash';
import CauseCard from '../components/CauseCard';

const inter = Inter({ subsets: ['latin'] })

const metadataFilter: PublicationMetadataFilters = {
  // restrictPublicationMainFocusTo?: PublicationMainFocus[];
  // restrictPublicationLocaleTo?: string;
  // showPublicationsWithContentWarnings?: {
  //   oneOf: PublicationContentWarning[];
  // };
  restrictPublicationTagsTo: {
    all: ["beachsignalv2145"]
  }
}

const CardList = ({ publications }: { publications: any[] }) => {

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


const TrendingList = () => {
  const data = _.range(0, 3);
  return (
    <div>
      <Grid container>
        {
          data.map((item) => {
            return (
              <Grid className="item">
                <CauseCard />
              </Grid>
            )
          })
        }
      </Grid>
    </div>
  )
}

export default function Discover() {
  return (
    <div>

      <Feed />
    </div>
    // <div className="flex min-h-screen flex-col items-center justify-between p-24">
    //   {'data'}
    //   {JSON.stringify(publications)}
    //   <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
    //     <Image
    //       className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
    //       src="/next.svg"
    //       alt="Next.js Logo"
    //       width={180}
    //       height={37}
    //       priority
    //     />
    //   </div>

    //   <Feed />

    //   <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
    //     <a
    //       href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
    //       className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2 className={`${inter.className} mb-3 text-2xl font-semibold`}>
    //         Docs{' '}
    //         <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
    //           -&gt;
    //         </span>
    //       </h2>
    //       <p
    //         className={`${inter.className} m-0 max-w-[30ch] text-sm opacity-50`}
    //       >
    //         Find in-depth information about Next.js features and API.
    //       </p>
    //     </a>

    //     <a
    //       href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
    //       className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2 className={`${inter.className} mb-3 text-2xl font-semibold`}>
    //         Learn{' '}
    //         <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
    //           -&gt;
    //         </span>
    //       </h2>
    //       <p
    //         className={`${inter.className} m-0 max-w-[30ch] text-sm opacity-50`}
    //       >
    //         Learn about Next.js in an interactive course with&nbsp;quizzes!
    //       </p>
    //     </a>


    //   </div>
  )
}
