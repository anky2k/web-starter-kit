import Script from 'next/script';

// to be in ENV
const GOOGLE_CLIENT_ID = "268128624341-tv04kbo6n2ki8lmpkeih3brukv4vloff.apps.googleusercontent.com";
// PWA prod CLIENT_ID - 171585693881-93jei1bqpoaejkq5ha63iemuq8bbmoar.apps.googleusercontent.com

const GoogleOneTap = () => {
  const signInHandler = (response) => {
    if (response && response.credential) {
      // JWT token obtained from Google with details of user
      // send to BE API to check user exists or not. 
      console.log(response.credential);
    }
  };

  const initializeOneTap = () => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: signInHandler
        // context: "use"
        // auto_select: true
      });
    }
  };

  const showOneTapPrompt = () => {
    /* shows One Tap UI prompt -
    ** i) if any session(doesn't shows in Incognito) available
    ** ii) And not opted out(from google account settings)
    */
    if (window.google) {
      window.google.accounts.id.prompt(notification => {
        console.log(notification);
      });
    }
  };

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="lazyOnload"
        onLoad={() => {
          initializeOneTap();
          showOneTapPrompt();
        }}
      />
    </>
  );
};
export default GoogleOneTap;