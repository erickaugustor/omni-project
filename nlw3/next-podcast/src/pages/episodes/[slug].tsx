import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

import { api } from '../../services/api';

import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt'

import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString'

import styles from './episode.module.scss'
import { useContext } from 'react';
import { PlayerContext } from '../../contexts/playerContext';

type Episode = {
  id: string
  thumbnail: string
  title: string
  members: string
  publish_at: string,
  publishAt: string,
  durationAsString: string,
  description: string,
  duration: number;
  url: string;
}

type EpisodeProps = {
  episode: Episode
}

export default function Episode({ episode }: EpisodeProps) {
  const { play } = useContext(PlayerContext)

  const router = useRouter();

  /*
  fallback: true

  if (router.isFallback) {
    return <p>Carregando...</p>
  }
  */

  return (
    <div className={styles.episode}>
      <div className={styles.thumbnailContainer}>
        <Link href="/ ">
          <button type="button">
            <img src="/arrow-left.svg" alt="Voltar" />
          </button>
        </Link>

        <Image
          width={700}
          height={160}
          src={episode.thumbnail}
          objectFit="cover"
        /> 

        <button type="button" onClick={() => play(episode)}>
          <img src="/play.svg" alt="Tocar episódio" />
        </button>
      </div>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishAt}</span>
        <span>{episode.durationAsString}</span>
      </header>

      <div className={styles.description} dangerouslySetInnerHTML={{ __html: episode.description }}/>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 2,
      _sort: 'published_at',
      _order: 'desc'
    }
  });

  const paths = data.map(episode => {
    return {
      params: {
        slug: episode.id
      }
    }
  })
  
  return {
    paths, // or []
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await api.get(`/episodes/${ctx.params.slug}`);
  
  const episode = {
    ...data,
    pulishedAt: format(parseISO(data.published_at), 'd MMM yy', { locale: ptBR }),
    duration: Number(data.duration),
    durationAsString: convertDurationToTimeString(Number(data.file.duration))
  };

  return {
    props: {
      episode
    },
    revalidate: 60 * 60 * 24,
  }
}