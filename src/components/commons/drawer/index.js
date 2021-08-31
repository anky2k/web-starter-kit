import Close from '../svgicons/close';

const Drawer = ({
  // eslint-disable-next-line no-unused-vars
  children, title, close, visible, type = 'md'
}) => (
  <div
    data-testid="drawer-container"
    className={`${visible ? 'h-3/4' : 'h-0'} 
      baseContainer z-10 fixed bottom-0 w-full overflow-hidden rounded-t-2xl bg-white
      transition-all duration-300
      motion-reduce:transition-none motion-reduce:transform-none
    `}
  >
    <div className="drawer-header w-full flex-row justify-between p-4">
      <div className="drawer-title text-sm font-medium text-center">
        {title}
        {' '}
        <div
          onClick={() => close()}
          alt="Close Icon"
          className="w-6 h-6 absolute right-3 top-3"
          data-testid="drawer-close"
          role="presentation"
        >
          <Close />
        </div>
      </div>
    </div>
    <div className="w-full h-full px-4 flex overflow-y-auto">
      {children}
    </div>
  </div>
);
export default Drawer;
