import Button from 'components/common/button';
import Card from 'components/common/card';
import { Field, Form } from 'formik';

const ChallengeSettingsForm = () => (
    <Form>
        <div className="pt-4">
            <label
                htmlFor="challenge-title"
                className="block w-full border-none bg-transparent py-2 outline-none"
            >
                Title
            </label>

            <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                <Field
                    id="challenge-title"
                    name="title"
                    maxLength={32}
                    className="w-full bg-transparent outline-none"
                    placeholder="Enter a title for the challenge"
                />
            </Card>
        </div>

        <div className="pt-4">
            <label
                htmlFor="challenge-description"
                className="block w-full border-none bg-transparent py-2 outline-none"
            >
                Description
            </label>

            <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                <Field
                    as="textarea"
                    id="challenge-description"
                    name="description"
                    className="w-full bg-transparent outline-none"
                    maxLength={500}
                    rows={4}
                    placeholder="Enter a description for the challenge"
                />
            </Card>
        </div>

        <div className="pt-4">
            <label
                htmlFor="challenge-points"
                className="block w-full border-none bg-transparent py-2 outline-none"
            >
                Points
            </label>

            <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                <Field
                    id="challenge-points"
                    name="points"
                    className="w-full bg-transparent outline-none"
                    type="number"
                    placeholder="Enter a points for the challenge"
                />
            </Card>
        </div>

        <div className="pt-4">
            <label
                htmlFor="challenge-category"
                className="block w-full border-none bg-transparent py-2 outline-none"
            >
                Category
            </label>

            <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                <Field
                    id="challenge-category"
                    name="category"
                    as="select"
                    className="w-full border-none bg-transparent"
                >
                    <option value="" className="bg-zinc-600">
                        Select a category
                    </option>
                    <option value="Social" className="bg-zinc-600">
                        Social
                    </option>
                    <option value="Video" className="bg-zinc-600">
                        Video
                    </option>
                    <option value="Concept" className="bg-zinc-600">
                        Concept
                    </option>
                    <option value="Wallet" className="bg-zinc-600">
                        Wallet
                    </option>
                    <option value="SDK" className="bg-zinc-600">
                        SDK
                    </option>
                    <option value="Deploy" className="bg-zinc-600">
                        Deploy
                    </option>
                    <option value="Staking" className="bg-zinc-600">
                        Staking
                    </option>
                    <option value="Game" className="bg-zinc-600">
                        Game
                    </option>
                    <option value="Client" className="bg-zinc-600">
                        Client
                    </option>
                    <option value="NFT" className="bg-zinc-600">
                        NFT
                    </option>
                </Field>
            </Card>
        </div>

        <div className="pt-4">
            <label
                htmlFor="challenge-difficulty"
                className="block w-full border-none bg-transparent py-2 outline-none"
            >
                Difficulty
            </label>

            <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                <Field
                    id="challenge-difficulty"
                    name="difficulty"
                    as="select"
                    className="w-full border-none bg-transparent"
                >
                    <option value="" className="bg-zinc-600">
                        Select a difficulty
                    </option>
                    <option value="Easy" className="bg-zinc-600">
                        Easy
                    </option>
                    <option value="Medium" className="bg-zinc-600">
                        Medium
                    </option>
                    <option value="Hard" className="bg-zinc-600">
                        Hard
                    </option>
                </Field>
            </Card>
        </div>

        <div className="pt-4">
            <label
                htmlFor="challenge-author-name"
                className="block w-full border-none bg-transparent py-2 outline-none"
            >
                Author name
            </label>

            <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                <Field
                    id="challenge-author-name"
                    name="authorName"
                    maxLength={32}
                    className="w-full bg-transparent outline-none"
                    placeholder="Enter the name of the challenge author"
                />
            </Card>
        </div>

        <div className="pt-4">
            <label
                htmlFor="challenge-author-github"
                className="block w-full border-none bg-transparent py-2 outline-none"
            >
                Author GitHub
            </label>

            <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                <Field
                    id="challenge-author-github"
                    name="authorGithub"
                    maxLength={32}
                    className="w-full bg-transparent outline-none"
                    placeholder="Enter the GitHub of the challenge author"
                />
            </Card>
        </div>

        <div className="pt-4">
            <label
                htmlFor="challenge-author-twitter"
                className="block w-full border-none bg-transparent py-2 outline-none"
            >
                Author Twitter
            </label>

            <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                <Field
                    id="challenge-author-twitter"
                    name="authorTwitter"
                    maxLength={32}
                    className="w-full bg-transparent outline-none"
                    placeholder="Enter the Twitter of the challenge author"
                />
            </Card>
        </div>

        <div className="width-full flex flex-row justify-end gap-2 pt-4">
            <Button
                className="w-40"
                type="submit"
                variant="orange"
                text="Save changes"
            />
        </div>
    </Form>
);

export default ChallengeSettingsForm;
