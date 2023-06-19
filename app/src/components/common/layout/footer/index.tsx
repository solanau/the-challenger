import Image from 'components/common/image';
import Link from 'next/link';

const Footer = () => (
    <footer className="border-t-2 border-[#141414] bg-black hover:text-white sm:mt-40">
        <div className="md:px-6 py-16">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-8 md:space-x-12">
                <div className='flex flex-col col-span-2 mx-4 items-center md:items-start'>
                    <Link href="https://solanau.org" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white">
                        <div className='flex flex-row ml-1'>
                            <Image
                                src="/logo_su.svg"
                                alt="solana icon"
                                width={40}
                                height={40}
                            />
                            <div className="flex flex-row items-center">
                                <Image
                                    src="/logo-text.svg"
                                    alt="solana text"
                                    className="hidden md:inline"
                                    width={108}
                                    height={16}
                                />
                            </div>
                        </div>
                    </Link>

                    <div className="flex md:ml-4">
                        <a href="https://twitter.com/solanauni" type="button" className="border-white text-secondary hover:text-white leading-normal hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-9 h-9 m-1">
                            <svg aria-hidden="true"
                                focusable="false"
                                data-prefix="fab"
                                data-icon="twitter"
                                className="w-4 h-full mx-auto"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                                ></path>
                            </svg>
                        </a>
                        {/* <a href="#!" type="button" className="cursor-default text-gray-700  leading-normal hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-9 h-9 m-1">
                            <svg aria-hidden="true"
                                focusable="false"
                                data-prefix="fab"
                                data-icon="instagram"
                                className="w-4 h-full mx-auto"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                                ></path>
                            </svg>
                        </a> */}
                        <a href="https://discord.gg/solanau" type="button" className="border-white text-secondary hover:text-white leading-normal hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-9 h-9 m-1">
                            <svg aria-hidden="true"
                                focusable="false"
                                data-prefix="fab"
                                data-icon="discord"
                                className="w-4 h-full mx-auto"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 256 180"
                            >
                                <path
                                    fill="currentColor"
                                    d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z">
                                </path>
                            </svg>
                        </a>

                        <a href="https://www.linkedin.com/in/danadegenius/" type="button" className="border-white text-secondary hover:text-white leading-normal hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-9 h-9 m-1">
                            <svg aria-hidden="true"
                                focusable="false"
                                data-prefix="fab"
                                data-icon="linkedin-in"
                                className="w-4 h-full mx-auto"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                                ></path>
                            </svg>
                        </a>

                        {/* <a href="#!" type="button" className="cursor-default text-gray-700 leading-normal hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-9 h-9 m-1">
                            <svg aria-hidden="true"
                                focusable="false"
                                data-prefix="fab"
                                data-icon="github"
                                className="w-4 h-full mx-auto"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 496 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                                ></path>
                            </svg>
                        </a> */}
                        {/* <a href="#!" type="button" className="cursor-default text-gray-700 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-9 h-9 m-1">
                            <svg aria-hidden="true"
                                focusable="false"
                                data-prefix="fab"
                                data-icon="facebook-f"
                                className="w-4 h-full mx-auto"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 550 550"
                            >
                                <path
                                    fill="currentColor"
                                    d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                                ></path>
                            </svg>
                        </a>
                        <a href="#!" type="button" className="cursor-default text-gray-700 leading-normal hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-9 h-9 m-1">
                            <svg aria-hidden="true"
                                focusable="false"
                                data-prefix="fab"
                                data-icon="google"
                                className="w-4 h-full mx-auto"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="currentColor"
                                    d="M23.3 7.3c0-.2-.3-1.8-1-2.5-.9-1-1.9-1.1-2.4-1.1h-.1c-3.1-.2-7.7-.2-7.8-.2 0 0-4.7 0-7.8.2h-.1c-.5 0-1.5.1-2.4 1.1-.7.8-1 2.4-1 2.6 0 .1-.2 1.9-.2 3.8v1.7c0 1.9.2 3.7.2 3.8 0 .2.3 1.8 1 2.5.8.9 1.8 1 2.4 1.1h.3c1.8.2 7.3.2 7.5.2 0 0 4.7 0 7.8-.2h.1c.5-.1 1.5-.2 2.4-1.1.7-.8 1-2.4 1-2.6 0-.1.2-1.9.2-3.8v-1.7c.1-1.8-.1-3.7-.1-3.8zm-7.4 4.9-6 3.2c-.1 0-.1.1-.2.1s-.2 0-.2-.1c-.1-.1-.2-.2-.2-.4V8.5c0-.2.1-.3.2-.4s.3-.1.5 0l6 3.2c.2.1.3.2.3.4s-.2.4-.4.5z"
                                ></path>
                            </svg>
                        </a> */}
                    </div>

                    <div className="mb-6 m-2 sm:text-left place-items-start items-start font-normal tracking-tight text-secondary">
                        © 2023 Solana U
                    </div>

                    {/* <div>
                        <form action="">
                            <div className="flex flex-col gap-2 text-left font-normal tracking-tighter text-slate-200">
                                <div className="">
                                    <p className="">
                                        Sign up for our newsletter
                                    </p>
                                </div>

                                <div className="flex justify-items-center mb-12">
                                    <div className="flex-1 w-64">
                                        <input
                                            type="text"
                                            className="
                                        form-control
                                        block
                                        px-3
                                        py-1
                                        text-base
                                        font-normal
                                        text-gray-700
                                        bg-white bg-clip-padding
                                        border border-solid border-gray-300
                                        rounded-l
                                        transition
                                        ease-in-out
                                        m-0
                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            id="exampleFormControlInput1"
                                            placeholder="Email address"/>
                                    </div>

                                    <div className=" flex-1 w-32">
                                        <button type="submit" className="inline-block px-6 py-2 border-y border-r border-solid border-white text-secondary hover:text-white text-xs leading-tight rounded-r hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                                            {`>`}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div> */}
                </div>

                <div className="mb-6 items-center mx-auto max-w-screen-lg">
                    <div className="font-normal capitalize mb-2.5">SOLANA</div>

                    <div className="flex flex-col mb-0 gap-2">
                        <Link href="https://solana.com" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white">
                            Website
                        </Link>
                        <Link href="https://solana.org" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white">
                            Foundation
                        </Link>
                        <Link href="https://solanamobile.com/" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white">
                            Solana Mobile
                        </Link>
                        <Link href="https://solanapay.com/" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white">
                            Solana Pay
                        </Link>
                        <Link href="https://solana.org/grants" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white">
                            Grants
                        </Link>
                        <Link href="https://solana.com/careers" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white">
                            Careers
                        </Link>
                    </div>
                </div>

                <div className="mb-6 items-center mx-auto max-w-screen-lg">
                    <h5 className="font-normal capitalize tracking-tight  mb-2.5">DEVELOPERS</h5>

                    <div className="flex flex-col mb-0 gap-2">
                        <Link href="https://docs.solana.com/developers" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white">
                            Documentation
                        </Link>
                        <Link href="https://github.com/solana-labs/solana" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white">
                            Github
                        </Link>
                        <Link href="https://beta.solpg.io/" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white">
                            Playground
                        </Link>
                        <Link href="https://solanacookbook.com/" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white">
                            Cookbook
                        </Link>
                        <Link href="https://buildspace.so/solana-core" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white">
                            Developer Course
                        </Link>
                        <Link href="https://www.youtube.com/@solplay8055/videos" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white">
                            Unity Game Dev
                        </Link>

                    </div>
                </div>

                <div className="mb-6 items-center mx-auto max-w-screen-lg">
                    <h5 className="font-normal tracking-tight  mb-2.5">ECOSYSTEM</h5>

                    <div className="flex flex-col mb-0 gap-2">
                        <Link href="https://solana.com/news" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white">
                            News
                        </Link>
                        <Link href="https://solana.com/events" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white">
                            Events
                        </Link>
                        <Link href="https://app.realms.today/discover" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white">
                            Realms
                        </Link>
                        <Link href="https://solana.org/validators" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white">
                            Validators
                        </Link>
                        <Link href="https://www.youtube.com/@SolanaFndn" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white">
                            Youtube
                        </Link>
                        <Link href="https://twitter.com/solana_devs" target="_blank" rel="noopener noreferrer" passHref className="text-secondary hover:text-white">
                            Twitter
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
