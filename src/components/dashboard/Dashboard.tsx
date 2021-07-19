import React from 'react';
import styled from 'styled-components';
import { Route, Switch, useRouteMatch } from 'react-router';
import { AppBar, Toolbar, Drawer } from '@material-ui/core';
import {
  DarkModeToggle,
  LocaleToggle,
  Flex,
  Logo,
  ToolbarSpacing,
} from '@chia/core';
import { defaultLocale, locales } from '../../config/locales';
import Wallets from '../wallet/Wallets';
import FullNode from '../fullNode/FullNode';
import Plot from '../plot/Plot';
import Farm from '../farm/Farm';
import Pool from '../pool/Pool';
import Block from '../block/Block';
import DashboardMargin from './DashboardMargin';
import DashboardSideBar from './DashboardSideBar';
import { DashboardTitleTarget } from './DashboardTitle';
import TradeManager from '../trading/TradeManager';
import BackupCreate from '../backup/BackupCreate';

const StyledRoot = styled(Flex)`
  height: 100%;
  background: ${({ theme }) => theme.palette.type === 'dark' ? 'linear-gradient(to bottom, #2b2549, #272042)' : 'linear-gradient(to bottom, #fbf8fd, #f5fafe)'};
  // overflow: hidden;
`;

const StyledAppBar = styled(AppBar)`
  width: ${({ theme }) => `calc(100% - ${theme.drawer.width})`};
  margin-left: ${({ theme }) => theme.drawer.width};
  z-index: ${({ theme }) => theme.zIndex.drawer + 1};
`;

const StyledDrawer = styled(Drawer)`
  z-index: ${({ theme }) => theme.zIndex.drawer + 2};
  width: ${({ theme }) => theme.drawer.width};
  flex-shrink: 0;

  > div {
    width: ${({ theme }) => theme.drawer.width};
    border: none;
  }
`;

const StyledBody = styled(Flex)`
  min-width: 0;
  background: ${({ theme }) => theme.palette.type === 'dark' ? 'rgba(19, 12, 44, .2)' : '#ffffff'};
`;

const StyledBrandWrapper = styled(Flex)`
  height: 64px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  // border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

export default function Dashboard() {
  const { path } = useRouteMatch();

  return (
    <StyledRoot>
      <BackupCreate />
      <StyledAppBar position="fixed" color="transparent" elevation={0}>
        <Toolbar>
          <DashboardTitleTarget />
          <Flex flexGrow={1} />
          <LocaleToggle locales={locales} defaultLocale={defaultLocale} />
          <DarkModeToggle />
        </Toolbar>
      </StyledAppBar>
      <StyledDrawer variant="permanent">
        <StyledBrandWrapper>
          <Logo width={2 / 3} />
        </StyledBrandWrapper>
        <DashboardSideBar />
      </StyledDrawer>
      <StyledBody flexDirection="column" flexGrow={1}>
        <ToolbarSpacing />
        <Switch>
          <Route path={`${path}`} exact>
            <FullNode />
          </Route>
          <Route path={`${path}/block/:headerHash`} exact>
            <Block />
          </Route>
          <Route path={`${path}/wallets`}>
            <Wallets />
          </Route>
          <Route path={`${path}/plot`}>
            <Plot />
          </Route>
          <Route path={`${path}/farm`}>
            <Farm />
          </Route>
          <Route path={`${path}/pool`}>
            <Pool />
          </Route>
          <Route path={`${path}/trade`}>
            <TradeManager />
          </Route>
        </Switch>
      </StyledBody>
      <DashboardMargin />
    </StyledRoot>
  );
}
