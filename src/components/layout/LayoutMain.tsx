import React, { ReactElement, ReactNode } from 'react';
import { Container } from '@material-ui/core';
import styled from 'styled-components';
import { Flex, Loading } from '@chia/core';
import DashboardTitle from '../dashboard/DashboardTitle';

const StyledContainer = styled(Container)`
  padding-top: ${({ theme }) => `${theme.spacing(3)}px`};
  padding-bottom: ${({ theme }) => `${theme.spacing(3)}px`};
  flex-grow: 1;
  display: flex;
`;

const StyledInnerContainer = styled(Flex)`
  flex-grow: 1;
`;

type Props = {
  children?: ReactElement<any>;
  title?: ReactNode;
  loading?: boolean;
  loadingTitle?: ReactNode;
};

export default function LayoutMain(props: Props) {
  const { children, title, loading, loadingTitle } = props;

  return (
    <>
      <DashboardTitle>{title}</DashboardTitle>

      <StyledInnerContainer>
        <StyledContainer maxWidth="lg">
          <Flex flexDirection="column" gap={2} flexGrow="1">
            {loading ? (
              <Flex
                flexDirection="column"
                flexGrow={1}
                alignItems="center"
                justifyContent="center"
              >
                <Loading>{loadingTitle}</Loading>
              </Flex>
            ) : (
              children
            )}
          </Flex>
        </StyledContainer>
      </StyledInnerContainer>
    </>
  );
}

LayoutMain.defaultProps = {
  children: undefined,
};
