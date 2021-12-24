import React from 'react';
import styles from './index.css';

const BasicLayout: React.FC = props => {
  return (
    <div>
      <h1 className={styles.title}>Welcome to SpaceX Launch Searcher!</h1>
      {props.children}
    </div>
  );
};

export default BasicLayout;
