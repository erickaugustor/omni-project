import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/Link'

import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt'

import { api } from '../services/api'
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString'

import styles from './home.module.scss'

type Episode = {
  id: string
  thumbnail: string
  title: string
  members: string
  publish_at: string,
  publishAt: string,
  durationAsString: string,
}

type HomeProps = {
  allEpisodes: Episode[]
  latestEpisodes: Episode[]
}

export default function Home(props: HomeProps) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.homepage}>
        <section className={styles.latestEpisodes}>
          <h2>Último lançamentos</h2>

          <ul>
            {
              props.latestEpisodes.map(episode => (
                <li key={episode.id}>
                  <Image
                    width={192}
                    height={192}
                    src={episode.thumbnail}
                    alt={episode.title}
                    objectFit="cover"
                  />

                  <div className={styles.episodeDetails}>
                    <Link href={`/episodes/${episode.id}`}>
                      <a>
                        {episode.title}
                      </a>
                    </Link>

                    <p>{episode.members}</p>
                    <span>{episode.publishAt}</span>
                    <span>{episode.durationAsString}</span>

                    <button type="button">
                      <img src="play-green.svg" alt="Tocar episódio" />
                    </button>
                  </div>
                </li>
              ))
            }
          </ul>
        </section>

        <section className={styles.allEpisodes}>
          <h2>Todos os episódios</h2>

          <table cellSpacing={0}>
            <thead>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </thead>
            <tbody>
              {
                props.allEpisodes.map(episode => (
                  <tr key={episode.id}>
                    <td style={{ width: 72 }}>
                      <Image
                        width={192}
                        height={192}
                        src={episode.thumbnail}
                        alt={episode.title}
                        objectFit="cover"
                      />
                    </td>
                    <td>
                      <Link href={`/episodes/${episode.id}`}>
                        <a>{episode.title}</a>
                      </Link>
                    </td>
                    <td>{episode.members}</td>
                    <td style={{ width: 100 }}>{episode.publishAt}</td>
                    <td>{episode.durationAsString}</td>
                    <td>
                      <button type="button">
                        <img src="/play-green.svg" alt="Tocar episódio" />
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </section>
      </div>
      Oie
    </div>
  )
}

// getServerSideProps everytime
// getStaticSideProps once

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  });

  const episodes = data.map(episodeo => ({
    ...episodeo,
    pulishedAt: format(parseISO(episodeo.published_at), 'd MMM yy', { locale: ptBR }),
    duration: Number(episodeo.duration),
    durationAsString: convertDurationToTimeString(Number(episodeo.file.duration))
  }))

  const latestEpisodes = episodes.slice(0, 2)
  const allEpisodes = episodes.slice(2, episodes.length)

  return {
    props: {
      allEpisodes: allEpisodes || [],
      latestEpisodes: latestEpisodes || [],
    },
    revalidate: 60 * 60 * 8,
  }
}