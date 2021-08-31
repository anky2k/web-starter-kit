import { memo } from 'react';
import CircularProgress from '../circular-loader';

const CentralLoader = () => (
  <div
    data-testid="central-loader"
  >
    <div>
      <CircularProgress
        type="greyLoaderSm"
      />
    </div>
  </div>
);

const arePropsEqual = (prevProps, nextProps) => (
  prevProps.type === nextProps.type
);
export default memo(CentralLoader, arePropsEqual);
