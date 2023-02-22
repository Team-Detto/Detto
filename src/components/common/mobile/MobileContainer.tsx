import { ContainerType } from 'types/containerType';
import styled from '@emotion/styled';

const MobileContainer = ({ children }: ContainerType) => {
  return <MobileContainerWrapper>{children}</MobileContainerWrapper>;
};

const MobileContainerWrapper = styled.div`
  padding: 0 1rem;
  position: relative;
`;

export default MobileContainer;
