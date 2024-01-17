import Head from 'next/head';
import IssuesPage from '../components/IssuesPage/IssuesPage';

export default function Home() {
  return (
    <div>
      <Head>
        <title>GitHub Issues App</title>
        <meta name='description' content='GitHub Issues App using Next.js' />
      </Head>
      <main>
        <IssuesPage />
      </main>
    </div>
  );
}
