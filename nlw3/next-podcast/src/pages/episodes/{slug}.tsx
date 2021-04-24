import { GetStaticProps } from 'next';
import { useRouter } from 'next/router'
import { api } from '../../services/api';

import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt'

import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString'

export default function Episode() {
  const router = useRouter();

  return (
    <h1>{router.query.slug}</h1>
  )
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