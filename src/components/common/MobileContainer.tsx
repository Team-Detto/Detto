import { ContainerType } from 'types/containerType';
import styled from '@emotion/styled';

const MobileContainer = ({ children }: ContainerType) => {
  return <MobileContainerWrapper>{children}</MobileContainerWrapper>;
};

const MobileContainerWrapper = styled.div`
  width: 390px;
  margin: 0 auto;
  position: relative;
`;

export default MobileContainer;
