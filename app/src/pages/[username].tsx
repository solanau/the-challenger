import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';

type ProfilePageProps = {
    userName: string;
};

const ProfilePage: NextPage<ProfilePageProps> = ({ userName }) => {
    return (
        <>
            <NextSeo
                title={'hello'}
                description="Build your profile to contribute in style."
            ></NextSeo>
        </>
    );
};

export default ProfilePage;

export const getServerSideProps: GetServerSideProps = async context => {
    let userName = context.params.username;
    if (userName instanceof Array) {
        userName = userName[0];
    }

    return {
        props: {
            userName,
        },
    };
};
