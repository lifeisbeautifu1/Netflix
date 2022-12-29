import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import { Header, Banner, Row } from "../components";
import { requests } from "../utils/requests";

import netflixOriginals from "../data/netflixOriginals.json";
import topRated from "../data/topRated.json";
import trendingNow from "../data/trendingNow.json";
import actionMovies from "../data/actionMovies.json";
import comedyMovies from "../data/comedyMovies.json";
import horrorMovies from "../data/horrorMovies.json";
import romanceMovies from "../data/romanceMovies.json";
import documentaries from "../data/documentaries.json";

interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
}

const Home: NextPage<Props> = ({
  netflixOriginals,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries,
}) => {
  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
      <Head>
        <title>Netfilx - Home</title>
        <meta name="description" content="Generated by create next app" />
        <link
          rel="icon"
          href="https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.ico"
        />
        b
      </Head>
      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <Banner netflixOriginals={netflixOriginals} />
        <section className="md:space-y-24">
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={actionMovies} />
          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Scary Movies" movies={horrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaries} />
        </section>
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  // const [
  //   netflixOriginals,
  //   trendingNow,
  //   topRated,
  //   actionMovies,
  //   comedyMovies,
  //   horrorMovies,
  //   romanceMovies,
  //   documentaries,
  // ] = await Promise.all([
  //   fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
  //   fetch(requests.fetchTrending).then((res) => res.json()),
  //   fetch(requests.fetchTopRated).then((res) => res.json()),
  //   fetch(requests.fetchActionMovies).then((res) => res.json()),
  //   fetch(requests.fetchComedyMovies).then((res) => res.json()),
  //   fetch(requests.fetchHorrorMovies).then((res) => res.json()),
  //   fetch(requests.fetchRomanceMovies).then((res) => res.json()),
  //   fetch(requests.fetchDocumentaries).then((res) => res.json()),
  // ]);
  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  };
};
