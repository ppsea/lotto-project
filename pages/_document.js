import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
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
          <link rel="icon" type="image/x-icon" href="/static/logo.png" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap"
            rel="stylesheet"
          />
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8483661130481553"
            crossOrigin="anonymous"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
