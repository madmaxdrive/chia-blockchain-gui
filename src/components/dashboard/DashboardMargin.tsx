import React from 'react';
import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import {
  Card,
  Flex, FormatLargeNumber,
  ToolbarSpacing,
} from '@chia/core';
import { Trans } from '@lingui/macro';
import {
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';

import check from '@chia/icons/images/check.svg';
import circle from '@chia/icons/images/circle.svg';
import error from '@chia/icons/images/error.svg';

import { RootState } from '../../modules/rootReducer';
import fullnodeReducer from '../../modules/fullNode';

const Margin = styled(Flex)`
  width: 300px;
`;

const StyledCard = styled(Card)`
  margin: 0 30px 30px !important;
  background: ${({ theme }) => theme.palette.type === 'dark' ? '#332d59' : '#ffffff'};
  border-radius: 12px;
  box-shadow: 5px 10px 20px 0 rgba(0, 0, 0, ${({ theme }) => theme.palette.type === 'dark' ? .2 : .1});

  & > div {
    padding: 20px !important;
  }
`;

const StyledTitle = styled.h3`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 !important;

  small {
    font-size: 14px;
  }
`;

const StyledList = styled(List)`
  padding: 0;
  margin: 20px 0 0 !important;

  & + & {
    padding-top: 20px;
    border-top: 1px solid rgba(0, 0, 0, .1);
  }
`;

const StyledItem = styled(ListItem)`
  padding: 0;
  margin-top: 10px;

  &:first-child {
    margin-top: 0;
  }
`;

const StyledText = styled(ListItemText)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  color: #717288;

  & > * {
    font-weight: 900;
  }

  & > :last-child {
    font-size: 12px;
    color: ${({ theme }) => theme.palette.secondary.main};
  }
`;

const StyledSpan = styled.span`
  display: flex;
  align-items: center;
  color: #f8a71d;
`;

const Icon = styled.img`
  display: block;
`;

export default function DashboardMargin() {
  const connected = useSelector((state: RootState) => state.daemon_state.full_node_connected);
  const state = useSelector((state: RootState) => state.full_node_state.blockchain_state);

  return (
    <Margin flexDirection="column">
      <ToolbarSpacing />
      <StyledCard>
        <StyledTitle><Trans>Full Node Status</Trans></StyledTitle>
        <StyledList dense>
          <StyledItem>
            <StyledText
              primary={<Trans>Status</Trans>}
              secondary={<Status state={state} />}
            />
          </StyledItem>
          <StyledItem>
            <StyledText
              primary={<Trans>Peak Height</Trans>}
              secondary={state?.peak?.height ?? 0}
            />
          </StyledItem>
          <StyledItem>
            <StyledText
              primary={<Trans>Connection</Trans>}
              secondary={<Icon src={connected ? check : error} alt="" />}
            />
          </StyledItem>
        </StyledList>
      </StyledCard>

      <StyledCard>
        <StyledTitle>
          <Trans>Balance</Trans>
          <small>(XYZ)</small>
        </StyledTitle>
        <StyledList dense>
          <StyledItem>
            <StyledText
              primary={<Trans>Total</Trans>}
              secondary={<StyledSpan>0</StyledSpan>}
            />
          </StyledItem>
          <StyledItem>
            <StyledText
              primary={<Trans>Spendable</Trans>}
              secondary={0}
            />
          </StyledItem>
        </StyledList>
        <StyledList dense>
          <StyledItem>
            <StyledText
              primary={<Trans>Pending Total</Trans>}
              secondary={0}
            />
          </StyledItem>
          <StyledItem>
            <StyledText
              primary={<Trans>Pending Balance</Trans>}
              secondary={0}
            />
          </StyledItem>
          <StyledItem>
            <StyledText
              primary={<Trans>Pending Change</Trans>}
              secondary={0}
            />
          </StyledItem>
        </StyledList>
      </StyledCard>
    </Margin>
  );
}

const rotate = keyframes`
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Loading = styled.div`
  width: 18px;
  height: 18px;
  margin-left: 10px;
  background: url(${circle}) center center no-repeat ${({ theme }) => theme.palette.type === 'dark' ? '#272042' : '#efeff5'};
  border: 2px solid ${({ theme }) => theme.palette.type === 'dark' ? '#413d60' : '#dedde5'};
  border-radius: 9px;
  animation: ${rotate} 2s linear infinite;
`;

function Status({ state }: { state: ReturnType<typeof fullnodeReducer>['blockchain_state'] }) {
  if (!state || !state.sync) {
    return (
      <Loading />
    );
  }

  if (state.sync.sync_mode) {
    return (
      <StyledSpan>
        <FormatLargeNumber value={state.sync.sync_tip_height} />
        <Loading />
      </StyledSpan>
    );
  }

  if (!state.sync.synced) {
    return (
      <Icon src={error} alt="" />
    );
  }

  return (
    <Icon src={check} alt="" />
  );
}
