import { ContainerType } from 'types/containerType';

const WebContainer = ({ children }: ContainerType) => {
  return <div style={{ width: '1200px', margin: '0 auto' }}>{children}</div>;
};

export default WebContainer;
