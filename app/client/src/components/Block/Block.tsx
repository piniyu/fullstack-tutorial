import React from 'react';
import classes from 'Block.module.scss';

const block = (props: React.ReactNode) => <div className={classes.block}>{props}</div>

export default block