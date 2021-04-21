import Head from 'next/head'

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      Oie
    </div>
  )
}

export async function getServerSideProps() {
  const response = await fetch('http://localhost:3333/episodeos');
  const data = await response.json();

  return {
    props: {
      episodeos: data,
    }
  }
}