import React from 'react';
import { useState } from 'react/cjs/react.production.min';
import styles from './Colors.module.css';


export const Dot = (props) => {
    return (
        <span className={styles.dot}>
        </span>
    );
}

export const Colors = () => {

    return (
        <div>
            <button>New</button>
            <ul>
                <li>Red</li>
                <Dot />
                <li>Green</li>
                <li>Blue</li>
            </ul>
        </div>
    );
};