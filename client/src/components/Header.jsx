import React from 'react'
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header = () => {
    const { t, i18n } = useTranslation()

    const changeLanguage = (event) => {
        i18n.changeLanguage(event.target.value)
    }

    const language = () => {
        const languageLetters = localStorage.getItem('i18nextLng')
        if (languageLetters) {
            return languageLetters
        }
        return 'UA'
    }

    return (
        <div>
            <ul>
                <li><NavLink to="/">{t('header.first_link')}</NavLink></li>
                <li><NavLink to="/flights">{t('header.second_link')}</NavLink></li>
                <li><NavLink to="/flightsCategory">{t('header.third_link')}</NavLink></li>
                <li><NavLink to="/flight">{t('header.fourth_link')}</NavLink></li>
            </ul>
            <select className='option-lang' onChange={(event) => changeLanguage(event)}>
                <option className='option' hidden>{language()}</option>
                <option className='option' value='UA'>UA</option>
                <option className='option' value='RU'>RU</option>
            </select>
        </div>
    )
}

export default Header;