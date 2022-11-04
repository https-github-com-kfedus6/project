import { t } from 'i18next';
import React from 'react'
import { useState } from 'react';
import ForgorPass from './ForgorPass';
import Log from './Log';
import Register from './Register';

const Authorize = ({ isShow, setIsShow, isRegister, setIsRegister }) => {
    const [isForgorPass,setIsForgorPass]=useState(false);
    return (
        <div onClick={() => {setIsForgorPass(false);setIsShow(false)}} className={isShow ? "authorize__main active" : "authorize__main"}>
            <div onClick={(e) => e.stopPropagation()} className="modal__content">
                 {/*<div className='authorize__header'>
                    <div className='authorize__logo'>
                        <img src={process.env.REACT_APP_API_URL + "logo-green.png"} alt="logo" />
                    </div>
                </div>
                <div className='register__or__log'>
                    <div onClick={() => setIsRegister(true)} className={isRegister ? "active1" : ""}>
                        <span className={!isRegister ? 'active-span' : ''} >{t("authorize.register")} </span> {t("authorize.or")}
                    </div>
                    <div onClick={() => setIsRegister(false)} className={!isRegister ? "active1" : ""}>
                        <span className={isRegister ? 'active-span' : ''}>{t("authorize.log")}</span>
                    </div>
                </div>*/}
                {isForgorPass ? <ForgorPass/> : isRegister ? <Register close={setIsShow} /> : <Log setIsRegister={setIsRegister} close={setIsShow} setIsForgorPass={setIsForgorPass} />}
            </div>
        </div>
    )
}

export default Authorize
//357033640863-eptls0vgv7h5rq9dq25m6kedsgfuj8l4.apps.googleusercontent.com
//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