import Nav from '../navbar'

const Layout = ({ children }) => {
  return(
    <div>               
      <Nav />
      <div className="top-4 relative overflow-auto">
        {children}
      </div>
    </div>
  );
}

export default Layout;
