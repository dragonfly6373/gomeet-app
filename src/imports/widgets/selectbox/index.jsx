import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import _ from "lodash";

import Radio from "./Radio";
import CheckBox from "./CheckBox";
import styles from "./styles";

const propTypes = {
    name: PropTypes.string,
    options: PropTypes.array.isRequired,
    getValue: PropTypes.func.isRequired,
    onChange: PropTypes.func,
    labelRenderer: PropTypes.func,
    multiple: PropTypes.bool,
    styles: PropTypes.instanceOf(Object)
}
const defaultProps = {
    multiple: false
}

class SelectBox extends React.Component {
    constructor(props) {
        console.log("# init:", props);
        
        super(props);
        this.state = {
            selectedOptions: props.options.filter(opt => (opt.checked || false))
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        const { options, multiple, onChange, getValue } = this.props;
        const { selectedOptions: currentSelected } = this.state;
        let changed = [];
        const option = options.find(opt => (getValue(opt).toString() === event.currentTarget.value));
        // console.log("# change:", option, event.currentTarget.checked);
        if (multiple) {
            if (event.currentTarget.checked) changed = [...currentSelected, option];
            else changed = currentSelected.filter(item => (getValue(item).toString() !== event.currentTarget.value));
        } else {
            changed = [option];
        }
        if (onChange) onChange(changed);
        this.setState({selectedOptions: changed});
    }

    _isChecked(data) {
        const { getValue } = this.props;
        const { selectedOptions } = this.state;
        return selectedOptions.findIndex(opt => getValue(opt) == getValue(data)) != -1;
    }

    render() {
        const { options, getValue, labelRenderer, multiple, styles: customStyles } = this.props;
        const name = name || `select-${_.random(1000, 9999)}`;
        // console.log("# render selectbox:", this.state.selectedOptions);

        return (
            <div className={cx(styles.selectGroup, customStyles ? customStyles.selectGroup : null)}>
            {
                options.map((opt, index) => {
                    return multiple
                    ? <CheckBox key={`opt-${index}`} name={name} onChange={this.onChange}
                        value={getValue(opt)} label={labelRenderer(opt)} checked={this._isChecked.call(this, opt)} />
                    : <Radio key={`opt-${index}`} name={name} onChange={this.onChange}
                        value={getValue(opt)} label={labelRenderer(opt)} checked={this._isChecked.call(this, opt)} />
                })
            }
            </div>
        );
    }
}

SelectBox.propTypes = propTypes;
SelectBox.defaultProps = defaultProps;

export default SelectBox;
