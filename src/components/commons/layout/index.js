import Router from '../../../../router';

const Layout = ({ children }) => {
  return(
    <div>
      <div className="flex justify-end">
        <div className="flex justify-evenly">
          <div
            role="presentation"
            onClick={() => Router.pushState('repos')}
          >
            Git Hub
          </div>
          <span className="px-2">|</span>
          <div
            role="presentation"
            onClick={() => Router.pushState('feed')}
          >
            Feed
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

export default Layout;
