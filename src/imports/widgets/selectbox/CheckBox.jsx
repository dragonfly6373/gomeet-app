import React from "react";

import styles from "./styles";

export default ({name, value, checked, label, onChange}) => {
    const uid = `checkbox-${_.random(1000, 9999)}`;
    return (
        <div className={styles.optionContainer}>
            <input id={uid} type="checkbox" name={name} value={value} checked={checked || false} onChange={onChange} />
            <label htmlFor={uid}>{label}</label>
        </div>
    );
}
