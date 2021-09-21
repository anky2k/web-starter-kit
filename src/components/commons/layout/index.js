import Router from '../../../../router';

const Layout = ({ children }) => {
  return(
    <div className="h-screen w-screen fixed">
      <div className="flex justify-end">
        <div className="flex justify-evenly">
          <span
            role="presentation"
            onClick={() => Router.pushState('repos')}
          >
            Git Hub
          </span>
          <span className="px-2">|</span>
          <span
            role="presentation"
            onClick={() => Router.pushState('feed')}
          >
            Feed
          </span>
        </div>
      </div>
      {children}
    </div>
  );
}

export default Layout;
