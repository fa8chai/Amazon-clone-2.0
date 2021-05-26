import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { ProSidebar, Menu, MenuItem , SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import { selectCollapsed, selectItems, setCollapsed } from '../slices/basketSlice';
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from '@material-ui/core';
import { signIn, signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';


const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }))(Badge);
  

function Sidebar({ categories, onSearchValue }) {
    const router = useRouter();
    const collapsed = useSelector(selectCollapsed);
    const [session] = useSession();
    const items = useSelector(selectItems); 

    const dispatch = useDispatch();

    return (<SidebarContainer>
        <ProSidebar collapsedWidth={collapsed && '0'} breakPoint={!collapsed ? 'xl' : ''} toggled='true' collapsed={collapsed}>
            <SidebarHeader>
                <SidebarHeaderContent>
                    {session && <h3>Hello {session.user.name}</h3>}
                    <div onClick={!session ? signIn: signOut}><Button>{!session ? 'Sign In':'Logout'}</Button></div>
                </SidebarHeaderContent>
            </SidebarHeader>

            <SidebarContent>
            <Menu popperArrow={true} iconShape="circle">
                <MenuItem icon={<SearchIcon />}>
                    <SidebarSearch>
                    <input
                        type="text"
                        placeholder={
                            router.route === "/"
                                ? "Search products…"
                                : ""
                        }
                        onInput={(event) =>
                            router.route === "/" &&
                            onSearchValue(event.target.value)
                        }
                    />                    
                    </SidebarSearch>
                </MenuItem>
                <MenuItem icon={ 
                        <StyledBadge max={20} badgeContent={items.length} color="secondary">
                                <ShoppingCartIcon />
                        </StyledBadge>}
                >   
                    <div onClick={() => {
                        dispatch(setCollapsed(true))
                        router.push('/checkout')
                    }}>
                        <CartItem>
                            Basket <ArrowForwardIcon />
                        </CartItem> 
                    </div>
                     
                </MenuItem>
                {
                    categories?.map(category => (
                        <MenuItem  key={category.id} onClick={() => {
                                            dispatch(setCollapsed(true));
                        }} ><div>{category.title}</div></MenuItem>
                    ))
                 }
               
            </Menu>
            </SidebarContent>
            <SidebarFooter>
                <SidebarFooterContent>
                   <IconButton children={ <CloseIcon onClick={() => dispatch(setCollapsed(true))} />} />
                </SidebarFooterContent>
            </SidebarFooter>
        </ProSidebar>
    </SidebarContainer>)
}
const CartItem = styled.div`
    display: flex;
    justify-content: space-between;
    margin-left: 3px;
`;
const SidebarSearch = styled.div`
    flex: 0.4;
    border: 1px solid gray;
    border-radius: 3px;
    > input {
        border: none ;
        outline: none ;
        padding: 10px;
        color: inherit;
        background-color: inherit;
    }
`;
const SidebarFooterContent = styled.div`
    text-align: center;
    > .MuiIconButton-root {
        color: gray
    }
`;

const SidebarContainer = styled.div`
    height: 100vh;
    .pro-sidebar > .pro-sidebar-inner > .pro-sidebar-layout{
        overflow: hidden;
    }
    /* Works on Firefox */
    .pro-sidebar > .pro-sidebar-inner > .pro-sidebar-layout{
        
        scrollbar-width: thin;
        scrollbar-color: gray ;
    }
    /* Works on Chrome, Edge, and Safari */
    .pro-sidebar > .pro-sidebar-inner > .pro-sidebar-layout::-webkit-scrollbar {
        width: 6px;
    }
    .pro-sidebar > .pro-sidebar-inner > .pro-sidebar-layout::-webkit-scrollbar-thumb {
        background-color: gray;
    }
    .pro-sidebar > .pro-sidebar-inner > .pro-sidebar-layout:hover {
        overflow-y: auto;
    }
    > .pro-sidebar > .pro-sidebar-inner {
    background-color: #1d1d1d;
}
`;
const SidebarHeaderContent = styled.div`
    margin: 10px;
    display: flex;
    flex-direction: column;
    > div > button {
        color: black;
        background-color: yellow; 
        margin-top: 10px;
        width: 100%;
        :hover{
            background-color: yellow;
            opacity: 0.8;
        }
    }
    > div {
            color: inherit;
            text-decoration: none;
            width: 100%;
        }
`;
export default Sidebar