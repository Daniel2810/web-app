import { ApolloClient, InMemoryCache } from '@apollo/client';
import { type GetServerSideProps, type NextPage } from 'next';
import Head from 'next/head';
import { type PEHeaderProps } from '../../components/header/PEHeaderProps';
import CookProfilePage from '../../components/pages/cookProfile';
import { GetProfileQueryDocument } from '../../data-source/generated/graphql';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { data } = await new ApolloClient({
        uri: process.env.NEXT_PUBLIC_SERVER_URL,
        credentials: 'include',
        headers: { cookie: context.req.headers.cookie as string },
        cache: new InMemoryCache(),
        ssrMode: true,
    }).query({ query: GetProfileQueryDocument });

    return {
        props: {
            signedInUser: data.users.me,
        },
    };
};

const Index: NextPage = ({ signedInUser }: PEHeaderProps) => {
    return (
        <>
            <Head>
                <title>PeopleEat - Chef Profile</title>

                <meta name="title" content="" />
                <meta name="description" content="" />
                <meta name="keywords" content="" />

                <link rel="icon" href="/favicon.ico" />
            </Head>
            <CookProfilePage signedInUser={signedInUser} />
        </>
    );
};

export default Index;
