import Button from 'components/common/button';
import Card from 'components/common/card';
import Spinner from 'components/common/spinner';
import Text from 'components/common/text';
import { Field, Form } from 'formik';

interface Challenge {
    id: string;
    title: string;
    description: string;
    points: number;
}

interface EventSettingsFormProps {
    isLoading?: boolean;
    challenges: Challenge[];
}

const EventSettingsForm = ({
    isLoading = false,
    challenges,
}: EventSettingsFormProps) => (
    <Form>
        <div className="pt-4">
            <label
                htmlFor="event-title"
                className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']"
            >
                Title{' '}
            </label>

            <Field
                id="event-title"
                name="title"
                className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                placeholder="Enter a title for the event"
                maxLength={80}
                required
                disabled={isLoading}
                autoComplete="off"
            />
        </div>

        <div className="pt-4">
            <label
                htmlFor="event-description"
                className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']"
            >
                Short Description{' '}
            </label>

            <Field
                as="textarea"
                id="event-description"
                name="description"
                className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                placeholder="Enter a description for the event"
                required
                disabled={isLoading}
                autoComplete="off"
                maxLength={500}
                rows={4}
            />
        </div>

        <div className="pt-4">
            <label
                htmlFor="challenge-body"
                className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']"
            >
                Body{' '}
            </label>

            <Field
                as="textarea"
                id="challenge-body"
                name="body"
                className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                placeholder="Enter the body for the event (You can use markdown)"
                required
                disabled={isLoading}
                autoComplete="off"
                maxLength={8000}
                rows={8}
            />
        </div>

        <div className="pt-4">
            <label
                htmlFor="event-reviewers"
                className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']"
            >
                Reviewers (comma, separated list)
            </label>

            <Field
                id="event-reviewers"
                name="reviewers"
                className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                placeholder="Enter a reviewers for the event"
                maxLength={80}
                required
                disabled={isLoading}
                autoComplete="off"
            />
        </div>

        <div className="pt-4">
            <label
                htmlFor="event-managers"
                className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']"
            >
                Managers (comma, separated list)
            </label>

            <Field
                id="event-managers"
                name="managers"
                className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                placeholder="Enter a managers for the event"
                maxLength={80}
                required
                disabled={isLoading}
                autoComplete="off"
            />
        </div>

        <div className="pt-4">
            <label
                htmlFor="event-start-date"
                className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']"
            >
                Start Date{' '}
            </label>

            <Field
                id="event-start-date"
                name="startDate"
                className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                placeholder="Enter a start date for the event"
                type="datetime-local"
                required
                disabled={isLoading}
            />
        </div>

        <div className="pt-4">
            <label
                htmlFor="event-end-date"
                className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']"
            >
                End Date{' '}
            </label>

            <Field
                id="event-end-date"
                name="endDate"
                className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                placeholder="Enter a end date for the event"
                type="datetime-local"
                required
                disabled={isLoading}
            />
        </div>

        <div role="group" aria-labelledby="checkbox-group" className="pt-4">
            <Text variant="sub-heading" className="mt-4 mb-4">
                Participation NFT
            </Text>
            <div>
                <label
                    htmlFor="event-participation-minimun-challenges"
                    className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']"
                >
                    Minimum quantity of challenges submitted
                </label>

                <Field
                    id="event-participation-minimun-challenges"
                    name="participationNFT.minChallengesToCertificate"
                    className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                    placeholder="Enter the minimum quantity of challenges submitted to receive the NFT"
                    maxLength={3}
                    disabled={isLoading}
                    autoComplete="off"
                />
            </div>
            <div>
                <label
                    htmlFor="event-participation-max-users-to-certificate"
                    className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']"
                >
                    Maximum users to send certificate
                </label>

                <Field
                    id="event-participation-max-users-to-certificate"
                    name="participationNFT.maxUsersToCertificate"
                    className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                    placeholder="Enter the maximum users to send the certificate"
                    maxLength={3}
                    disabled={isLoading}
                    autoComplete="off"
                />
            </div>
            <div className="pt-4">
                <label
                    htmlFor="event-participation-candymachine-address"
                    className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']"
                >
                    Candy Machine Address
                </label>

                <Field
                    id="event-participation-candymachine-address"
                    name="participationNFT.candyMachineAddress"
                    className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                    placeholder="Enter the candymachine address to mint participation NFTs"
                    maxLength={80}
                    disabled={isLoading}
                    autoComplete="off"
                />
            </div>
            <div className="pt-4">
                <label
                    htmlFor="event-participation-collection-update-address"
                    className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']"
                >
                    Collection Update Authority Address
                </label>

                <Field
                    id="event-participation-collection-update-address"
                    name="participationNFT.collectionUpdateAuthority"
                    className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                    placeholder="Enter the collection authority address (required for mint)"
                    maxLength={80}
                    disabled={isLoading}
                    autoComplete="off"
                />
            </div>
        </div>

        <div role="group" aria-labelledby="checkbox-group" className="pt-4">
            <Text variant="sub-heading" className="mt-4 mb-4">
                Top leaderboard NFT
            </Text>
            <div>
                <label
                    htmlFor="event-top-leaderboard-minimun-points"
                    className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']"
                >
                    Minimum points
                </label>

                <Field
                    id="event-top-leaderboard-minimun-points"
                    name="topLeaderboardNFT.minPoints"
                    className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                    placeholder="Enter the minimum quantity of points to receive the NFT"
                    maxLength={3}
                    disabled={isLoading}
                    autoComplete="off"
                />
            </div>
            <div>
                <label
                    htmlFor="event-top-leaderboard-max-users-to-certificate"
                    className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']"
                >
                    Maximum users to send certificate
                </label>

                <Field
                    id="event-top-leaderboard-max-users-to-certificate"
                    name="topLeaderboardNFT.maxUsersToCertificate"
                    className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                    placeholder="Enter the maximum users to send the certificate"
                    maxLength={3}
                    disabled={isLoading}
                    autoComplete="off"
                />
            </div>
            <div className="pt-4">
                <label
                    htmlFor="event-top-leaderboard-candymachine-address"
                    className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']"
                >
                    Candy Machine Address
                </label>

                <Field
                    id="event-top-leaderboard-candymachine-address"
                    name="topLeaderboardNFT.candyMachineAddress"
                    className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                    placeholder="Enter the candymachine address to mint participation NFTs"
                    maxLength={80}
                    disabled={isLoading}
                    autoComplete="off"
                />
            </div>
            <div className="pt-4">
                <label
                    htmlFor="event-top-leaderboard-collection-update-address"
                    className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']"
                >
                    Collection Update Authority Address
                </label>

                <Field
                    id="event-top-leaderboard-collection-update-address"
                    name="topLeaderboardNFT.collectionUpdateAuthority"
                    className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                    placeholder="Enter the collection authority address (required for mint)"
                    maxLength={80}
                    disabled={isLoading}
                    autoComplete="off"
                />
            </div>
        </div>

        <div role="group" aria-labelledby="checkbox-group" className="pt-4">
            <Text variant="sub-heading" className="mt-4 mb-4">
                Challenges
            </Text>

            <div className="max-h-256 flex flex-col gap-5 overflow-y-auto px-2 py-4">
                {challenges.map(challenge => (
                    <label key={challenge.id}>
                        <Card className="flex gap-8 p-8">
                            <Field
                                type="checkbox"
                                name="challenges"
                                value={challenge.id}
                            />

                            <div className="flex grow items-center justify-between">
                                <div>
                                    <Text variant="sub-heading">
                                        Title: {challenge.title}
                                    </Text>
                                    <Text variant="paragraph">
                                        Description: {challenge.description}
                                    </Text>
                                </div>

                                <Text variant="sub-heading">
                                    Points: {challenge.points}
                                </Text>
                            </div>
                        </Card>
                    </label>
                ))}
            </div>
        </div>

        <div className="width-full flex flex-row justify-end gap-2 pt-4">
            <Button type="submit" variant="orange" disabled={isLoading}>
                {isLoading && <Spinner variant="large"></Spinner>}
                Save Changes
            </Button>
        </div>
    </Form>
);

export default EventSettingsForm;
