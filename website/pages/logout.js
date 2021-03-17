import Head from 'next/head'

export default function Logout () {
  return (
    <div>
      <Head>
        <title>Logout</title>
        <link rel='icon' href='/favicon.ico' />
        <meta http-equiv='refresh' content='0; url=/' />
      </Head>
    </div>
  )
}
