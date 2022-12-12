import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { ChangeEvent, useMemo, useState } from 'react';

const ChallengesPage: NextPage<any> = ({ challenges }, eventId) => {
    console.log('challenges are', challenges);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const filteredChallenges = useMemo(() => {
        // Avoid filter when selectedCategory is null
        if (!selectedCategory) {
            return challenges;
        }
        return challenges.filter(
            challenge => challenge.type === selectedCategory,
        );
    }, [selectedCategory, challenges]);

    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <>
            <NextSeo
                title="Solana Bounty Challenges"
                description="Complete the Solana challenges to collect Solana rewards!"
            ></NextSeo>

            <h1>hello</h1>

            {challenges ? (
                challenges.map(challenge => {
                    return (
                        <div
                            key={challenge.id}
                            className="mt-2 w-36 bg-red-400"
                        >
                            <Link
                                href={`http://localhost:3001/event/challenge/${challenge.id}`}
                            >
                                <h1>{challenge.info.name}</h1>
                            </Link>
                            <p>{challenge.info.description}</p>
                        </div>
                    );
                })
            ) : (
                <h1>no challenges</h1>
            )}
        </>
    );
};

export default ChallengesPage;

// getserversideprops to get the challenges from supabase using the eventId in the url
export const getServerSideProps: GetServerSideProps = async context => {
    const { eventId } = context.params;
    console.log(eventId);
    const supabase = createServerSupabaseClient(context);
    const { data: challenges, error } = await supabase
        .from('eventchallenges')
        .select('*, info:eventId(*)')
        .eq('eventId', eventId);

    if (error) {
        console.log(error);
        return {
            notFound: true,
        };
    }

    return {
        props: {
            challenges,
        },
    };
};
