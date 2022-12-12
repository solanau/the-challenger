import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { GetServerSideProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
type ChallengePageProps = {
    challengeId: string;
};
const Challenge: NextPage<any> = ({ challenge }) => {
    const supabase = useSupabaseClient();
    const logIn = async () => {
        const { error } = await supabase.auth.signInWithPassword({
            email: 'valentin@incility.com',
            password: 'fwefewfQQ1!',
        });
        if (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        logIn();
    }, []);

    const [text, setText] = useState<string>('');
    const submitForm = async () => {
        console.log('fuck');
        const { data, error } = await supabase.from('submissions').insert([
            {
                eventChallengeId: challenge.id,
                eventId: challenge.info.id,
                entry: text,
                user: '5ac77adb-5258-46ca-899f-67d5c01a7c14',
            },
        ]);
        if (error) {
            console.log(error);
        }
        console.log(data);
    };

    return (
        <>
            <div>
                <h1>{challenge.id}</h1>
                <h1>{challenge.info.name}</h1>

                <h1>random question</h1>
                <input onChange={e => setText(e.target.value)}></input>
                <button onClick={submitForm}>submit</button>
                <button onClick={logIn}>login</button>
            </div>
        </>
    );
};
export default Challenge;

// getserversideprops to get the challenge from supabase using the challengeId in the url
export const getServerSideProps: GetServerSideProps = async context => {
    const supabase = createServerSupabaseClient(context);
    const { challengeId } = context.params;
    console.log(challengeId);
    const { data: challenge, error } = await supabase
        .from('eventchallenges')
        .select('*, info:eventId(*)')
        .eq('id', challengeId)
        .single();

    if (error) {
        console.log(error);
    }

    return {
        props: {
            challenge,
        },
    };
};
