import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import _ from "lodash";

import Icon from "../icon";
import styles from "./styles";

const propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    size: PropTypes.oneOf(["normal", "small", "large", "circle"]),
    color: PropTypes.oneOf(["default", "primary", "danger", "warning", "success", "ghost"]),
    onClick: PropTypes.func.isRequired,
    leftIcon: PropTypes.string,
    rightIcon: PropTypes.string
};

const defaultProps = {
    label: "",
    size: "normal",
    color: "default"
};

export default class Button extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const {name, label, size, leftIcon, rightIcon, onClick} = this.props;
        const iconName = leftIcon || rightIcon || null;
        const classNames = cx({
            [styles.btn]: true,
            [styles["btn-lg"]]: size == "large",
            [styles["btn-sm"]]: (size == "small"),
            [styles["btn-circle"]]: (size == "circle")
        });
        return (
            <button className={classNames} onClick={onClick} dir={rightIcon ? "rtl" : "ltr"}>
                {iconName ? <Icon iconName={iconName} /> : null}
                <span>{label}</span>
            </button>
        );
    }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
