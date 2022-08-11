import React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from 'react-router-dom';

const Burger = () => {
  const { t, i18n } = useTranslation()
  const [isBurgerClick,setIsBurgerClick]=useState(false);
  return (
    <>
      <div className={isBurgerClick?"burger__menu active":"burger__menu"}>
        <ul onClick={()=>{setIsBurgerClick(false)}}>
            <li><NavLink to="/">{t('header.first_link')}</NavLink></li>
            <li><NavLink to="/flights">{t('header.second_link')}</NavLink></li>
            <li><NavLink to="/flightsCategory">{t('header.third_link')}</NavLink></li>
            <li><NavLink to="/flight">{t('header.fourth_link')}</NavLink></li>
        </ul>
      </div>
      <div onClick={()=>{setIsBurgerClick(!isBurgerClick)}} className={"header__burger"}>
          <div>
              <GiHamburgerMenu fontSize={"50px"}/>
          </div>
      </div>
    </>
  )
}

export default Burger