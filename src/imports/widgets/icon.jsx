import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const propTypes = {
  iconName: PropTypes.string.isRequired,
  prependIconName: PropTypes.string,
};

const defaultProps = {
  prependIconName: 'icon-gomeet-',
};

const Icon = ({
  className,
  prependIconName,
  iconName
}) => (
  <i className={cx(className, [prependIconName, iconName].join(''))} />
);

export default memo(Icon);

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;
