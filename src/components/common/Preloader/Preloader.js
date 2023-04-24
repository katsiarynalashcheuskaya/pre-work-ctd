import React from "react";
import icon from '../../../assets/icon.gif'
import s from './Preloader.module.css'

const Preloader = () => {
    return <img className={s.loadingIcon} src={icon}/>
}

export default Preloader;