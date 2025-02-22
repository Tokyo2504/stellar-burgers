import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <>
            <Link
              className={clsx(
                styles.link,
                currentPath === '/'
                  ? [styles.link, styles.link_active]
                  : styles.link
              )}
              to={'/'}
            >
              <BurgerIcon
                type={currentPath === '/' ? 'primary' : 'secondary'}
              />
              <p className='text text_type_main-default ml-2 mr-10'>
                Конструктор
              </p>
            </Link>
          </>
          <>
            <Link
              className={clsx(
                styles.link,
                currentPath === '/feed'
                  ? [styles.link, styles.link_active]
                  : styles.link
              )}
              to={'/feed'}
            >
              <ListIcon
                type={currentPath === '/feed' ? 'primary' : 'secondary'}
              />
              <p className='text text_type_main-default ml-2'>Лента заказов</p>
            </Link>
          </>
        </div>
        <div className={styles.logo}>
          <Logo className='' />
        </div>
        <div className={styles.link_position_last}>
          <Link
            className={clsx(
              styles.link,
              currentPath === '/profile'
                ? [styles.link, styles.link_active]
                : styles.link
            )}
            to={'/profile'}
          >
            <p className='text text_type_main-default ml-2'>
              {userName || 'Личный кабинет'}
            </p>
          </Link>
          <ProfileIcon
            type={currentPath === '/profile' ? 'primary' : 'secondary'}
          />
        </div>
      </nav>
    </header>
  );
};
