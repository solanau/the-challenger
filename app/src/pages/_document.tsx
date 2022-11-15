import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => (
    <Html>
        <Head>
            <link rel="shortcut icon" href="/favicon.ico" />
            <link
                href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&amp;display=swap"
                rel="stylesheet"
            />
        </Head>
        <body className="bg-neutral text-neutral">
            <Main />
            <NextScript />
        </body>
    </Html>
);

export default Document;
