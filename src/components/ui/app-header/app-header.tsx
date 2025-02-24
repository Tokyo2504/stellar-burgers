import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { NavLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActivePath =
    currentPath === '/' || currentPath.startsWith('/ingredients');
  const isFeedActivePath = currentPath.startsWith('/feed');
  const isProfileActivePath = currentPath.startsWith('/profile');

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <>
            <NavLink
              to='/'
              className={clsx(styles.link, isActivePath && styles.link_active)}
            >
              <BurgerIcon type={isActivePath ? 'primary' : 'secondary'} />
              <p className='text text_type_main-default ml-2 mr-10'>
                Конструктор
              </p>
            </NavLink>
          </>
          <>
            <NavLink
              to='/feed'
              className={clsx(
                styles.link,
                isFeedActivePath && styles.link_active
              )}
            >
              <ListIcon type={isFeedActivePath ? 'primary' : 'secondary'} />
              <p className='text text_type_main-default ml-2'>Лента заказов</p>
            </NavLink>
          </>
        </div>
        <div className={styles.logo}>
          <Logo className='' />
        </div>
        <div className={styles.link_position_last}>
          <NavLink
            to='/profile'
            className={clsx(
              styles.link,
              isProfileActivePath && styles.link_active
            )}
          >
            <ProfileIcon type={isProfileActivePath ? 'primary' : 'secondary'} />
            <p className='text text_type_main-default ml-2'>
              {userName || 'Личный кабинет'}
            </p>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
