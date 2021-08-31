import { useState, useEffect } from 'react';

export const devices = ['mobile', 'desktop'];

export const getDeviceType = () => {
  let device = 'desktop';
  if (!navigator) {
    return device;
  }
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) device = 'mobile';
  return device;
};

function useDevice(types = devices, values, defaultValue) {
  const getVariant = () => {
    const device = getDeviceType();
    const index = types.indexOf(device);
    return values[index] ? values[index] : defaultValue;
  };

  const [value, setValue] = useState(getVariant);

  useEffect(
    () => {
      setValue(getDeviceType);
    },
    []
  );
  return value;
}
export default useDevice;
