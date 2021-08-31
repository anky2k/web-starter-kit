const appVersion = require('../app-version');

const AppVersion = () => (
  <>
    <div style={{
      color: 'black',
      fontSize: '18px',
      marginTop: '110px',
      textAlign: 'center'
    }}
    >
      {appVersion}
    </div>
  </>
);
export default AppVersion;
