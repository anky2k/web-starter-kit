// import App from "next/app"
import '../src/styles/global.css';
import Head from 'next/head';
import dynamic from 'next/dynamic';
// import { Workbox, messageSW } from 'workbox-window';
import Layout from '../src/components/commons/layout';
import { TranslationProvider } from '../src/hooks/use-translation';
import { RouteStateProvider } from '../src/hooks/use-route-state';
import { getLocales } from '../src/sources/app';
import HeadMeta from '../src/components/commons/head-meta';

// TODO add withBasePath for everything that gets affected because of base-path i18n

const DrawerProvider = dynamic(() => import('../src/hooks/use-drawer').then(module => {
  const { DrawerProvider } = module;
  return DrawerProvider;
}));

const SnackbarProvider = dynamic(() => import('../src/hooks/use-snackbar').then(module => {
  const { SnackbarProvider } = module;
  return SnackbarProvider;
}));

const DialogProvider = dynamic(() => import('../src/hooks/use-dialog').then(module => {
  const { DialogProvider } = module;
  return DialogProvider;
}));

const LoaderProvider = dynamic(() => import('../src/hooks/use-loader').then(module => {
  const { LoaderProvider } = module;
  return LoaderProvider;
}));

const OverLayProvider = dynamic(() => import('../src/hooks/use-overlay').then(module => {
  const { OverLayProvider } = module;
  return OverLayProvider;
}));

export function reportWebVitals(metric) {
  console.log(metric);
  // const body = JSON.stringify(metric);
  // const url = 'analytics endpoint';

  // Use `navigator.sendBeacon()` if available, falling back to `fetch()`.
  // if (navigator.sendBeacon) {
  //   navigator.sendBeacon(url, body);
  // } else {
  //   fetch(url, { body, method: 'POST', keepalive: true });
  // }
}

// TODO add useServiceWorker hook have manifest.json generated from some js
// async function refreshCacheAndReload() {
//   console.warn('update found!!!');
//   const clearAllCaches = [];
//   if (caches) {
//     // Service worker cache should be cleared with caches.delete()
//     const cacheNames = await caches.keys();
//     console.warn('updating caches', cacheNames);
//     cacheNames.forEach(name => clearAllCaches.push(caches.delete(name)));
//   }
//   await Promise.all(clearAllCaches);
//   // delete browser cache and hard reload
//   window.location.reload(true);
// }

// function createUIPrompt(opts) {
//   // eslint-disable-next-line no-restricted-globals
//   if (confirm('A new update is available. Do you want to update now?')) {
//     opts.onAccept();
//   }
// }

function WebStarterKit({
  Component, pageProps, locales, locale
}) {
  // useEffect(() => {
  //   if ('serviceWorker' in navigator) {
  //     const wb = new Workbox('sw.js');
  //     let registration;

  //     const showSkipWaitingPrompt = event => {
  //       // `event.wasWaitingBeforeRegister` will be false if this is
  //       // the first time the updated service worker is waiting.
  //       // When `event.wasWaitingBeforeRegister` is true, a previously
  //       // updated service worker is still waiting.
  //       // You may want to customize the UI prompt accordingly.

  //       // Assumes your app has some sort of prompt UI element
  //       // that a user can either accept or reject.
  //       console.info(event);
  //       const prompt = createUIPrompt({
  //         onAccept: async () => {
  //           // Assuming the user accepted the update, set up a listener
  //           // that will reload the page as soon as the previously waiting
  //           // service worker has taken control.
  //           wb.addEventListener('controlling', event => {
  //             console.info('controlling event!!!', event);
  //             refreshCacheAndReload();
  //           });

  //           console.info(registration, registration.waiting);
  //           if (registration && registration.waiting) {
  //             // Send a message to the waiting service worker,
  //             // instructing it to activate.
  //             // Note: for this to work, you have to add a message
  //             // listener in your service worker. See below.
  //             messageSW(registration.waiting, { type: 'SKIP_WAITING' });
  //           }
  //         },

  //         onReject: () => {
  //           prompt.dismiss();
  //         }
  //       });
  //     };

  //     // Add an event listener to detect when the registered
  //     // service worker has installed but is waiting to activate.
  //     wb.addEventListener('waiting', showSkipWaitingPrompt);
  //     wb.addEventListener('externalwaiting', showSkipWaitingPrompt);

  //     wb.register().then(r => {
  //       registration = r;
  //     });
  //   }
  // }, []);
  return (
    <>
      <Head>
        <HeadMeta />
      </Head>
      <TranslationProvider
        locale={locale}
        locales={locales}
      >
        <OverLayProvider>
          <LoaderProvider>
            <DialogProvider>
              <DrawerProvider>
                <SnackbarProvider>
                  <RouteStateProvider>
                    <Layout>
                      <Component {...pageProps} />
                    </Layout>
                  </RouteStateProvider>
                </SnackbarProvider>
              </DrawerProvider>
            </DialogProvider>
          </LoaderProvider>
        </OverLayProvider>
      </TranslationProvider>
    </>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
WebStarterKit.getInitialProps = async ctx => {
  const { router } = ctx;
  const { locale } = router;
  try {
    const locales = await getLocales(locale);
    return {
      locale,
      locales
    };
  } catch (e) {
    console.log(e);
  }
  return {};
};


export default WebStarterKit;
