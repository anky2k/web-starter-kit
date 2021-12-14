import Document, {
  Html, Main, NextScript, Head as NextHead
} from 'next/document';

import bundleCss from '!raw-loader!../src/styles/tailwind-ssr.css';

class Head extends NextHead {
  getCssLinks(files) {
    if (process.env.NODE_ENV !== 'production') {
      return super.getCssLinks(files);
    }

    // do not return any css files in production
    return [];
  }
}
class VSAPortal extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);        
    return { 
      ...initialProps,
      styles: [
        ...initialProps.styles,
        process.env.NODE_ENV === 'production' ? (
          <style
            key='custom'
            dangerouslySetInnerHTML={{
              __html: bundleCss,
            }}
          />
        ) : (
          <></>
        ),
      ]
     };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="overflow-x-hidden bg-bg-primary h-screen">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default VSAPortal;
