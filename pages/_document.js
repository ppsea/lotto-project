import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
          <meta
            name="description"
            content="Share predicted lottery numbers with your friends | Lotto Friends"
          />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Lotto Friends" />
          <meta property="og:site_name" content="Lotto Friends" />
          <meta
            property="og:description"
            content="Share predicted lottery numbers with your friends | Lotto Friends | Lotto Friends"
          />
          <meta property="og:image" content="/static/logo.png" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
