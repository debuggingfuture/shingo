import Image from 'next/image'
import { Inter } from 'next/font/google'
import Grid from '@mui/material/Grid'
import { Avatar, Button } from '@mui/material'

const inter = Inter({ subsets: ['latin'] })

export default function Cause() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Grid container justifyContent="center">
        <Grid item justifyContent="center" alignItems="center">
          <Image
            src="/clean1.jpg"
            alt="Clean"
            width={180}
            height={37}
            priority
          />

        </Grid>


      </Grid>

      <Grid container>
        <Grid item justifyContent="center" alignItems="center">
          item 1

        </Grid>

        <Grid container item direction="row" xs={8} justifyContent="flex-start" alignItems="flex-start">
          Endorsed by
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </Grid>
      </Grid>
      <Grid>
        <h2>Collect</h2>
        <Button variant="contained" color="success">
          Collect
        </Button>



      </Grid>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`${inter.className} mb-3 text-2xl font-semibold`}>
            Templates{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p
            className={`${inter.className} m-0 max-w-[30ch] text-sm opacity-50`}
          >
            Discover and deploy boilerplate example Next.js&nbsp;projects.
          </p>
        </a>

      </div>
    </main>
  )
}
