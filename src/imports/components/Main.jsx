import React from 'react';
import styles from './styles';

export default class MainContainer extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className={styles.main}>
                <div className={styles.panel}>Left Panel</div>
                <div className={styles.content}>Main Content</div>
            </section>
        );
    }
}
