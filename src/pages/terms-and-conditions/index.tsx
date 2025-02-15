import { ApolloClient, InMemoryCache } from '@apollo/client';
import { type GetServerSideProps, type NextPage } from 'next';
import Head from 'next/head';
import TermsAndConditionsPage, { type TermsAndConditionsPageProps } from '../../components/pages/termsAndConditions';
import { FindLatestPublicTermsUpdateDocument } from '../../data-source/generated/graphql';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { data } = await new ApolloClient({
        uri: process.env.NEXT_PUBLIC_SERVER_URL,
        credentials: 'include',
        headers: { cookie: context.req.headers.cookie as string },
        cache: new InMemoryCache(),
        ssrMode: true,
    }).query({ query: FindLatestPublicTermsUpdateDocument });

    return {
        props: {
            signedInUser: data.users.signedInUser,
            latestTermsUpdate: data.publicTermsUpdates.findLatest,
        },
    };
};

const Index: NextPage<TermsAndConditionsPageProps> = ({ signedInUser, latestTermsUpdate }) => {
    return (
        <>
            <Head>
                <title>PeopleEat - Terms and Conditions</title>

                <meta name="title" content="Privatkoch werden" />
                <meta
                    name="description"
                    content="Genieße die Freiheit und Flexibilität wann du deine Privatkoch Services anbieten möchtest. Teile deine Leidenschaft mit deinen Gästen und schaffe einzigartige Erlebnismomente"
                />
                <meta name="keywords" content="Privatkoch werden, als Koch selbstständig machen, Eigenes Restaurant eröffnen" />

                <link rel="icon" href="/favicon.ico" />
            </Head>
            <TermsAndConditionsPage signedInUser={signedInUser} latestTermsUpdate={latestTermsUpdate} />
        </>
    );
};

export default Index;
