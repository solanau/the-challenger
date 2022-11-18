/* eslint-disable react/no-unescaped-entities */
import Button from 'components/common/button';
import Text from 'components/common/text';
import { createNewUser } from 'lib/api';
import { GetServerSideProps, NextPage } from 'next';
import { FormEvent, useState } from 'react';

interface ProfilePageProps {
    userId: string;
}

const UserProfilePage: NextPage<ProfilePageProps> = ({ userId }) => {
    const [fullName, setFullName] = useState('');
    const [userName, setUserName] = useState('');

    const handleFormSubmit = async (event: FormEvent) => {
        event.preventDefault();

        createNewUser({ id: userId, fullName, userName });
    };

    return (
        <>
            <section className="mt-36 px-4 pt-20 sm:px-8 md:mt-0 md:px-16 lg:px-32 xl:px-48">
                <h1>
                    <Text variant="heading">Profile Settings</Text>
                </h1>

                <form onSubmit={handleFormSubmit}>
                    <label className="block">
                        <Text variant="label">Full Name</Text>
                        <input
                            type="text"
                            className="text-black"
                            value={fullName}
                            onChange={ev => setFullName(ev.target.value)}
                        />
                    </label>

                    <label className="block">
                        <Text variant="label">User Name</Text>
                        <input
                            type="text"
                            className="text-black"
                            value={userName}
                            onChange={ev => setUserName(ev.target.value)}
                        />
                    </label>

                    <div>
                        <Button variant="orange" type="submit">
                            Submit
                        </Button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default UserProfilePage;

export const getServerSideProps: GetServerSideProps = async context => {
    let userId = context.params.userId;
    if (userId instanceof Array) {
        userId = userId[0];
    }

    return {
        props: {
            userId,
        },
    };
};
