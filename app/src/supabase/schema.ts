export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json }
    | Json[];

export interface Database {
    public: {
        Tables: {
            challenges: {
                Row: {
                    id: string;
                    title: string | null;
                    description: string | null;
                    markdown: string | null;
                };
                Insert: {
                    id?: string;
                    title?: string | null;
                    description?: string | null;
                    markdown?: string | null;
                };
                Update: {
                    id?: string;
                    title?: string | null;
                    description?: string | null;
                    markdown?: string | null;
                };
            };
            eventchallenges: {
                Row: {
                    id: string;
                    created_at: string | null;
                    challengeid: string | null;
                    events: string | null;
                };
                Insert: {
                    id?: string;
                    created_at?: string | null;
                    challengeid?: string | null;
                    events?: string | null;
                };
                Update: {
                    id?: string;
                    created_at?: string | null;
                    challengeid?: string | null;
                    events?: string | null;
                };
            };
            events: {
                Row: {
                    id: string;
                    start_date: string;
                    end_date: string;
                    name: string | null;
                    description: string | null;
                };
                Insert: {
                    id?: string;
                    start_date: string;
                    end_date: string;
                    name?: string | null;
                    description?: string | null;
                };
                Update: {
                    id?: string;
                    start_date?: string;
                    end_date?: string;
                    name?: string | null;
                    description?: string | null;
                };
            };
            rewards: {
                Row: {
                    id: string;
                    eventChallengeId: string | null;
                };
                Insert: {
                    id: string;
                    eventChallengeId?: string | null;
                };
                Update: {
                    id?: string;
                    eventChallengeId?: string | null;
                };
            };
            submissions: {
                Row: {
                    id: string;
                    eventId: string | null;
                    eventChallengeId: string | null;
                };
                Insert: {
                    id: string;
                    eventId?: string | null;
                    eventChallengeId?: string | null;
                };
                Update: {
                    id?: string;
                    eventId?: string | null;
                    eventChallengeId?: string | null;
                };
            };
            users: {
                Row: {
                    id: string;
                    created_at: string | null;
                };
                Insert: {
                    id: string;
                    created_at?: string | null;
                };
                Update: {
                    id?: string;
                    created_at?: string | null;
                };
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
    };
}
