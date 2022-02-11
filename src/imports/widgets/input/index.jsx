import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import _ from "lodash";

import Icon from "../icon";
import styles from "./styles";

const propTypes = {
    name: PropTypes.string,
    type: PropTypes.oneOf(["text", "number", "password", "email"]),
    label: PropTypes.string,
    labelPosition: PropTypes.oneOf(["top", "left"]),
    leftIcon: PropTypes.string,
    rightIcon: PropTypes.string,
    maxVal: PropTypes.number,
    minVal: PropTypes.number,
    maxLength: PropTypes.number
};

const defaultProps = {
    type: "text",
    labelPosition: "top"
};

export default class Input extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const {name, type, label, labelPosition, leftIcon, rightIcon} = this.props;
        const uid = `${name ? name : 'input'}-${_.random(1000, 9999)}`;
        const iconName = leftIcon || rightIcon || null;
        return (
            <div className={cx(styles.container, labelPosition == "top" ? styles.column : null)}>
                <label htmlFor={uid}>{label}</label>
                <div className={cx(styles.inputGroup, rightIcon ? styles.reverse : null)}>
                    {iconName ? <Icon iconName={iconName} /> : null}
                    <input id={uid} type={type} />
                </div>
            </div>
        );
    }
}
