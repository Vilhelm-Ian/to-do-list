import { createGetInitialProps } from '@mantine/next';
import Document, { Head, Html, Main, NextScript } from 'next/document';

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="an icon of an notepad"
            href="notepad-icon-2-1119966669.png"
            type="image/x-icon"
          />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body>
          <title>To Do List</title>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
