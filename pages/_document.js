import Document, {
  Html, Main, NextScript, Head
} from 'next/document';
import CustomHead from 'next-critical'
import { readFileSync } from 'fs'

let styleSheetContent = ''
class WebStarterKit extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    // critical css file
    const filePath = `./src/styles/global.css`
    styleSheetContent = readFileSync(filePath, 'utf8')
    
    return { ...initialProps };
  }

  render() {
    const CriticalCssHead = CustomHead(Head, styleSheetContent)
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
