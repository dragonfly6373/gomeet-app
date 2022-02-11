import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { styles } from './styles';

const propTypes = {
    items: PropTypes.instanceOf(Array).isRequired,
    itemRenderer: PropTypes.func.isRequired,
    itemHeight: PropTypes.number
};

export default class InfiniteScrollPagination extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = { top: 0, index: 0, height: 0, size: this.props.items.length };
        this.scrollTimer = null;
        this.timeout = null;
        this.containerHeight = null;
        this.containerRef = React.createRef();
        this.bodyRef = React.createRef();
    }

    _initSizing() {
        const { items, itemHeight: defaultHeight } = this.props;
        const { height: oldHeight, size: oldSize, index: oldIndex, itemHeight } = this.state;
        const parent = this.containerRef;
        const node = this.bodyRef;

        let index = oldIndex;
        let t = parent.scrollTop;
        let children = node.children || [];
        let h = itemHeight
            ? itemHeight
            : Math.max(defaultHeight, children.length ? (children[children.length - 1].offsetTop - node.offsetTop) / (children.length - 1) : 0);
        let height = items.length * h;
        let countVisible = Math.ceil(parent.clientHeight / h);
        let pageSize = countVisible * 3;
        if (items.length != oldSize) { // size change
            if (items.length - oldIndex < pageSize) {
                index = Math.max(items.length - pageSize, 0);
                t = index * h;
            }
        }

        if (index + pageSize > items.length) index = Math.max(items.length - pageSize, 0);
        // console.log("# initSizing:", {top: t, size: items.length, index: index, height: height, itemHeight: h, pageSize: pageSize});

        this.setState({
            top: t,
            index: index,
            height: height,
            itemHeight: h,
            size: items.length,
            pageSize: pageSize
        });
    }

    _handleScroll() {
        const parent = this.containerRef;
        const { top, itemHeight, pageSize, height } = this.state;
        let buffer = pageSize / 6 * itemHeight;
        if (Math.abs(parent.scrollTop - top) < buffer) return;
        const newState = {
            top: parent.scrollTop,
            index: Math.max(Math.floor((parent.scrollTop) / itemHeight), 0)
        };
        // console.log("@ scroll: ", newState);
        this.setState(newState);
    }

    _onSizeChange() {
        const { items, itemHeight } = this.props;
        const parent = this.containerRef;
        const node = this.bodyRef;
        if (!node || !parent || this.containerHeight == parent.clientHeight) return;
        this.containerHeight = parent.clientHeight;
        let children = node.children;
        let h = itemHeight ? itemHeight : (children[children.length - 1].offsetTop - node.offsetTop) / (children.length - 1);
        let height = items.length * h;
        let countVisible = Math.ceil(parent.clientHeight / h);
        this.setState({
            height: height,
            pageSize: 3 * countVisible
        });
    }

    _renderItems() {
        const { items, itemRenderer } = this.props;
        const { index, pageSize } = this.state;
        return items.slice(index, index + pageSize).map(i => {
            return itemRenderer(i, this.containerRef);
        });
    }

    render() {
        const { items } = this.props;
        const { index, height, itemHeight, pageSize } = this.state;
        let margin = Math.max((index - Math.round(pageSize / 6)) * itemHeight, 0) || 0;
        const customStyles = {
            marginTop: `${margin}px`,
            minHeight: height > 0 ? `${(items.length - index) * itemHeight}px` : '100%'
        };
        // console.log("# render:", index, customStyles);
        return (
            <div
                ref={(ref) => {
                    this.containerRef = ref;
                }}
                className={styles.container}>
                <div
                    ref={(ref) => {
                        this.bodyRef = ref;
                    }}
                    style={customStyles}
                    className={styles.contentWrapper}>
                    {this._renderItems.call(this)}
                </div>
            </div>
        );
    }

    componentDidMount() {
        window.addEventListener('resize', this._onSizeChange.bind(this));
        this.containerRef.addEventListener('scroll', () => {
            if (this.scrollTimer) window.clearTimeout(this.scrollTimer);
            this.scrollTimer = window.setTimeout(this._handleScroll.bind(this), 100);
        });
    }

    componentDidUpdate(prevState, prevProp) {
        const { items } = this.props;
        // console.log("# componentDidUpdate - items.length:", items.length);
        if (items && items.length != this.state.size) {
            this._initSizing.call(this);
        }
    }

    componentWillUnMount() {
        this.containerRef.removeEventListener('scroll', this._handleScroll.bind(this));
        window.removeEventListener('resize', this._onSizeChange.bind(this));
        window.clearTimeout(this.timeout);
    }
}

InfiniteScrollPagination.propTypes = propTypes;
