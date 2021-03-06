import Document, {
  Html, Main, NextScript, Head
} from 'next/document';

import bundleCss from '!raw-loader!../src/styles/tailwind-ssr.css';

// class Head extends NextHead {
//   getCssLinks(files) {
//     if (process.env.NODE_ENV !== 'production') {
//       return super.getCssLinks(files);
//     }

//     // do not return any css files in production
//     return [];
//   }
// }
class WebStarterKit extends Document {
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
        <body className="overflow-x-hidden appBgColor">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default WebStarterKit;
