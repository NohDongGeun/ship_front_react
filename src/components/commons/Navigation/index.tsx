import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const Navigation: React.FC = () => {
    return (
        <Container>
            <ContentContainer>
                <TopBox>
                    <UserInfoBox>
                        <UserImage>
                            <img src={'/images/img_test_user.png'} alt={''} />
                        </UserImage>
                        <h4>Angela Grey</h4>
                        <p>sam573526@gmail.com</p>
                    </UserInfoBox>
                    <NavWrapper>
                        <NavLi>
                            <NavLink href={''}>
                                <img
                                    src={'/images/icon_dashboard.svg'}
                                    alt={''}
                                />
                                <p>Dashboard</p>
                            </NavLink>
                        </NavLi>
                        <NavLi>
                            <NavLink href={''}>
                                <img
                                    src={'/images/icon_dashboard.svg'}
                                    alt={''}
                                />
                                <p>Dashboard</p>
                            </NavLink>
                        </NavLi>
                        <NavLi>
                            <NavLink href={''}>
                                <img
                                    src={'/images/icon_dashboard.svg'}
                                    alt={''}
                                />
                                <p>Dashboard</p>
                            </NavLink>
                        </NavLi>
                        <NavLi>
                            <NavLink href={''}>
                                <img
                                    src={'/images/icon_dashboard.svg'}
                                    alt={''}
                                />
                                <p>Dashboard</p>
                            </NavLink>
                        </NavLi>
                        <NavLi>
                            <NavLink href={''}>
                                <img
                                    src={'/images/icon_dashboard.svg'}
                                    alt={''}
                                />
                                <p>Dashboard</p>
                            </NavLink>
                        </NavLi>
                        <NavLi>
                            <NavLink href={''}>
                                <img
                                    src={'/images/icon_dashboard.svg'}
                                    alt={''}
                                />
                                <p>Dashboard</p>
                            </NavLink>
                        </NavLi>
                    </NavWrapper>
                </TopBox>

                <LogOutButton>
                    <img src={'/images/icon_logout.svg'} alt={''} />
                    <p>Logout</p>
                </LogOutButton>
            </ContentContainer>
        </Container>
    );
};

export default Navigation;

export const Container = styled.aside`
    width: 16%;
    max-width: 300px;
    height: 100%;
    background-color: #232323;
`;

export const ContentContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const TopBox = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

export const UserInfoBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 50px 20px;
    margin-bottom: 20px;

    & > h4 {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;
    }

    & > p {
        font-size: 12px;
        color: #dddcde;
    }
`;

export const UserImage = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 10px;

    & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const LogOutButton = styled.button`
    width: 100%;
    padding: 20px 20px 40px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    & > img {
        width: 20px;
        height: 20px;
        object-fit: cover;
        margin-right: 10px;
    }

    & > p {
        font-size: 14px;
        font-weight: bold;
        color: #fff;
    }
`;

export const NavWrapper = styled.nav`
    display: flex;
    flex-direction: column;
`;

export const NavLi = styled.li`
    display: flex;
    width: 100%;
`;

export const NavLink = styled(Link)`
    color: #fff;
    padding: 20px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    & > img {
        width: 20px;
        height: 20px;
        object-fit: cover;
        margin-right: 10px;
    }

    & > p {
        font-size: 14px;
        font-weight: bold;
    }
`;
