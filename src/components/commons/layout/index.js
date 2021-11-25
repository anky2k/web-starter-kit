import Nav from '../navbar'

const Layout = ({ children }) => {
  return(
    <div>               
      <Nav />
      <div className="relative overflow-auto bg-bg-primary h-full">      
        {children}
      </div>
    </div>
  );
}

export default Layout;

