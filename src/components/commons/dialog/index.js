import Close from '../svgicons/close';

const Dialog = ({
  children, close, visible, title
}) => (
  <div
    data-testid="dialog-container"
    className={`
      w-2/4
      ${visible ? 'visible' : 'invisible'} 
      z-10 fixed rounded-lg p-4 bg-white 
      overflow-x-hidden overflow-y-auto
      top-2/4 left-1/4      
    `}
  >
    <div data-testid="dialog-header flex w-full justify-between relative">
      <div className="font-semibold">{title}</div>
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



