import Close from '../svgicons/close';

const Dialog = ({
  children, title, close, visible
}) => (
  <div
    data-testid="dialog-container"
    className={`
      w-3/4
      ${visible ? 'visible' : 'invisible'} 
      z-10 fixed rounded-lg p-4 bg-white 
      overflow-y-auto
      transition-all duration-300
      top-2/4 left-2/4
      transform-gpu origin-bottom -translate-y-2/4 -translate-x-2/4
      motion-reduce:transition-none motion-reduce:transform-none
    `}
  >
    <div data-testid="dialog-header flex w-full justify-between relative">
      <div data-testid="dialog-title">{title}</div>
      <div
        data-testid="dialog-close"
        role="presentation"
        onClick={() => (close())}
        className="w-6 h-6 absolute right-3 top-3"
      >
        <Close />
      </div>

    </div>
    <div data-testid="dialog-content w-full">
      {children}
    </div>
  </div>
);
export default Dialog;
