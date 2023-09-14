import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import ViewCarouselOutlinedIcon from '@mui/icons-material/ViewCarouselOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import LiveHelpOutlinedIcon from '@mui/icons-material/LiveHelpOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'; // 매칭
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'; // 유저
import {
    PATH_ADMINS,
    PATH_BANNERS,
    PATH_CATEGORIES,
    PATH_COMMUNITIES,
    PATH_COMMUNITY_CATEGORIES,
    PATH_EXPERTS,
    PATH_FAQS,
    PATH_MARKETS,
    PATH_MATCHINGS,
    PATH_QNAS,
    PATH_SERVICE_CATEGORIES,
    PATH_USERS,
    PATH_WHOLESALES,
} from '../../../constants/pathConstants';
import { signOut } from 'next-auth/react';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30px',
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

interface IPersistentDrawerLeft {
    children: React.ReactNode;
    title: string;
    selectedHref: string;
}

interface ILinkItem {
    label: string;
    href: string;
    isSelected: boolean;
    icon: React.ReactNode;
}

const LinkItem: React.FC<ILinkItem> = ({
    label,
    href,
    icon,
    isSelected = false,
}) => {
    return (
        <ListItem key={label} disablePadding>
            <ListItemButton
                component={'a'}
                href={href}
                sx={{
                    display: 'flex',
                    paddingTop: '16px',
                    paddingBottom: '16px',
                }}
            >
                <ListItemIcon>{icon}</ListItemIcon>
                <Typography
                    sx={{
                        fontSize: '14px',
                        fontWeight: isSelected ? 'bold' : '500',
                    }}
                >
                    {label}
                </Typography>
            </ListItemButton>
        </ListItem>
    );
};

const DefaultLayout: React.FC<IPersistentDrawerLeft> = ({
    title,
    children,
    selectedHref,
}) => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const onClickLogout = () => {
        signOut({ callbackUrl: '/signin' });
    };

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <Box
                    sx={{
                        display: 'flex',
                        padding: '20px 0',
                        height: '100%',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}
                >
                    <List>
                        <LinkItem
                            label={'배너 목록'}
                            href={PATH_BANNERS}
                            icon={<ViewCarouselOutlinedIcon />}
                            isSelected={selectedHref.includes('banners')}
                        />
                        <LinkItem
                            label={'카테고리 목록'}
                            href={PATH_CATEGORIES}
                            icon={<CategoryOutlinedIcon />}
                            isSelected={selectedHref.includes('categories')}
                        />
                        <LinkItem
                            label={'FAQ 목록'}
                            href={PATH_FAQS}
                            icon={<LiveHelpOutlinedIcon />}
                            isSelected={selectedHref.includes('faqs')}
                        />
                        <LinkItem
                            label={'QNA 목록'}
                            href={PATH_QNAS}
                            icon={<QuizOutlinedIcon />}
                            isSelected={selectedHref.includes('qnas')}
                        />
                        <LinkItem
                            label={'시장 목록'}
                            href={PATH_MARKETS}
                            icon={<StorefrontOutlinedIcon />}
                            isSelected={selectedHref.includes('markets')}
                        />
                        <LinkItem
                            label={'전문가 목록'}
                            href={PATH_EXPERTS}
                            icon={<ForumOutlinedIcon />}
                            isSelected={selectedHref.includes('experts')}
                        />
                        <LinkItem
                            label={'도소매 목록'}
                            href={PATH_WHOLESALES}
                            icon={<LocalGroceryStoreOutlinedIcon />}
                            isSelected={selectedHref.includes('wholesales')}
                        />
                        <LinkItem
                            label={'커뮤니티 카테고리 목록'}
                            href={PATH_COMMUNITY_CATEGORIES}
                            icon={<ForumOutlinedIcon />}
                            isSelected={selectedHref.includes(
                                'communityCategories'
                            )}
                        />
                        <LinkItem
                            label={'커뮤니티 목록'}
                            href={PATH_COMMUNITIES}
                            icon={<ForumOutlinedIcon />}
                            isSelected={selectedHref.includes('communities')}
                        />
                        <LinkItem
                            label={'서비스 카테고리 목록'}
                            href={PATH_SERVICE_CATEGORIES}
                            icon={<ForumOutlinedIcon />}
                            isSelected={selectedHref.includes(
                                'serviceCategories'
                            )}
                        />
                        <LinkItem
                            label={'유저 목록'}
                            href={PATH_USERS}
                            icon={<PersonOutlineOutlinedIcon />}
                            isSelected={selectedHref.includes('users')}
                        />
                        <LinkItem
                            label={'매칭 목록'}
                            href={PATH_MATCHINGS}
                            icon={<PeopleOutlinedIcon />}
                            isSelected={selectedHref.includes('matchings')}
                        />
                        <LinkItem
                            label={'관리자 목록'}
                            href={PATH_ADMINS}
                            icon={<PeopleOutlinedIcon />}
                            isSelected={selectedHref.includes('admins')}
                        />
                    </List>

                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={onClickLogout}>
                                <ListItemIcon>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <Typography
                                    sx={{
                                        fontSize: '14px',
                                        fontWeight: '400',
                                    }}
                                >
                                    로그아웃
                                </Typography>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <Main open={open} sx={{ flexGrow: 1, overflowX: 'auto' }}>
                <DrawerHeader />
                {children}
            </Main>
        </Box>
    );
};

export default DefaultLayout;
