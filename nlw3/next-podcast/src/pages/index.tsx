import { GetStaticProps } from 'next'
import Head from 'next/head'

import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt'

import { api } from '../services/api'
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString'

type HomeProps = {
  episodeos: Array<{
    id: string
    thumbmail: string
    title: string
    members: string
    publish_at: string,
    publishAt: string,
  }>
}

export default function Home(props: HomeProps) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        
      </div>
      Oie
    </div>
  )
}

// getServerSideProps everytime
// getStaticSideProps once

export const getStaticSideProps: GetStaticProps = async () => {
  const { data } = await api.get('episodeos', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  });

  const episodeos = data.map(episodeo => ({
    ...episodeo,
    pulishedAt: format(parseISO(episodeo.published_at), 'd MMM yy', { locale: ptBR }),
    duration: Number(episodeo.duration),
    durationAsString: convertDurationToTimeString(Number(episodeo.file.duration))
  }))

  return {
    props: {
      episodeos,
    },
    revalidate: 60 * 60 * 8,
  }
}