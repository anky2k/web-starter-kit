/* eslint-disable react/display-name */
import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const ErrorIcon = dynamic(
  () => import('../svgicons/snackbar/error'),
  {
    loading: () => <div />,
    ssr: false
  }
);

const SuccessIcon = dynamic(
  () => import('../svgicons/snackbar/success'),
  {
    loading: () => <div />,
    ssr: false
  }
);

const InfoIcon = dynamic(
  () => import('../svgicons/snackbar/info'),
  {
    loading: () => <div />,
    ssr: false
  }
);

const WarnIcon = dynamic(
  () => import('../svgicons/snackbar/warn'),
  {
    loading: () => <div />,
    ssr: false
  }
);

const SnackType = {
  error: 'bg-red-400',
  info: 'bg-blue-400',
  success: 'bg-green-400',
  warn: 'bg-yellow-400'
};

const IconType = {
  error: ErrorIcon,
  info: InfoIcon,
  success: SuccessIcon,
  warn: WarnIcon
};

// TODO add close button and call hide function
function SnackBar(
  {
    message = '', visible, type = 'info', hide
  }
) {
  useEffect(() => {
    if (visible) {
      setTimeout(() => hide(), 3000);
    }
  }, [visible]);

  const Icon = (IconType[type] || IconType.info);

  if (!message) {
    return (<div />);
  }

  return (
    <div className={`
      ${visible ? 'animate-fade-in-bottom bottom-14' : 'animate-fade-out-bottom'}      
      fixed
      z-20              
      left-1/3
      flex items-center justify-center
      text-white max-w-sm w-1/3 
      ${SnackType[type] || SnackType.info}
      shadow-md
      rounded-lg
      overflow-hidden
      mx-auto
    `}
    >
      <div className="w-10 border-r px-2">
        <Icon />
      </div>

      <div className="flex items-center py-3">
        <div className="mx-3">
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default SnackBar;
