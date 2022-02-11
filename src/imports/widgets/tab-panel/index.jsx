import React from 'react';
import PropTypes from 'prop-types';
import Icon from "/imports/widgets/icon";

import cx from 'classnames';
import styles from './styles.scss';

const tabPanelPropTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
    headerPosition: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    headerFlow: PropTypes.oneOf(['row', 'column']),
    activeKey: PropTypes.string,
    styles: PropTypes.instanceOf(Object)
};
const tabPanelDefaultProps = {
    headerPosition: "top",
    headerFlow: "row"
};

const tabItemPropTypes = {
    itemKey: PropTypes.string.isRequired,
    accessKey: PropTypes.string,
    headerText: PropTypes.string.isRequired,
    itemIcon: PropTypes.string,
    isActive: PropTypes.bool,
    badge: PropTypes.any,
    styles: PropTypes.instanceOf(Object)
};
const tabItemDefaultProps = {
    headerText: "",
    accessKey: "",
    isActive: false
};

export default class TabPanel extends React.PureComponent {
    constructor(props) {
        super(props);
        this.props = props;
        const activeKey = this.props.activeKey ? this.props.activeKey : this.props.children.reduce((a, c) => (c.props.isActive ? c.props.itemKey : a), "");
        this.state = {
            activeKey: activeKey ? activeKey : this.props.children[0].props.itemKey
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.activeKey !== this.props.activeKey) {
            this.setState({activeKey: this.props.activeKey})
        }
        if (prevProps.badge != this.props.badge) {
            this.setState({badge: badge});
        }
    }

    renderHeaders() {
        const {children} = this.props;
        const styleX = this.props.styles;

        return React.Children.map(children, child => {
            return React.cloneElement(child, {
                styles: (styleX ? styleX : null),
                key: child.props.itemKey,
                onClick: () => this.activeTab.call(this, child.props.itemKey),
                isActive: this.state.activeKey == child.props.itemKey
            });
        });
    }

    activeTab = (key) => {
        const {onTabChange} = this.props;
        this.setState({activeKey: key});
        if (onTabChange) onTabChange(key);
    }

    renderBody() {
        const {children} = this.props;
        const styleX = this.props.styles;
        if (!children || !children.length) return null;
        return (
            <div className={styles.tabBody} styles={styleX && styleX.tabBody ? styleX.tabBody : null}>
            {
                children.filter((c) => (c.props.itemKey === this.state.activeKey)).map(c => c.props.children)
            }
            </div>
        );
    }

    render() {
        const {children, headerPosition} = this.props;
        const styleX = this.props.styles;

        return (
            <div className={cx({
                    [styles.tabPanel]: true,
                    [styles.headerTop]: headerPosition == "top",
                    [styles.headerRight]: headerPosition == "right",
                    [styles.headerBottom]: headerPosition == "bottom",
                    [styles.headerLeft]: headerPosition == "left"
                })}>
                <ul className={styles.headerContainer}>
                    {this.renderHeaders.call(this)}
                </ul>
                {this.renderBody.call(this)}
            </div>
        );
    }
}
TabPanel.propTypes = tabPanelPropTypes;
TabPanel.defaultProps = tabPanelDefaultProps;

class TabItem extends React.PureComponent {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        const { itemIcon, headerText, isActive, onClick, badge, accessKey, className } = this.props;
        const styleX = this.props.styles;
        return (
            <li className={cx(styles.tabHeaderItem, isActive ? styles.activated : "", badge ? styles.badge : "", className)}
                style={styleX && styleX.tabHeaderItem ? styleX.tabHeaderItem : null }
                data-badge={badge}
                accessKey={accessKey}
                onClick={() => onClick()}>
                {itemIcon ? <Icon iconName={itemIcon} className={styles.itemIcon} style={styleX && styleX.itemIcon ? styleX.itemIcon : null} /> : null}
                <span className={styles.tabLabel} style={styleX && styleX.headerText ? styleX.headerText : null}>
                    {headerText}
                </span>
            </li>
        );
    }
}
TabItem.propTypes = tabItemPropTypes;
TabItem.defaultProps = tabItemDefaultProps;

TabPanel.TabItem = TabItem;
