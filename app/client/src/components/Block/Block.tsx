<<<<<<< HEAD
import React from 'react'
import classes from './block.module.scss'

const block = (props: { children: React.ReactNode }) => (
  <div className={classes.block}>{props.children}</div>
)
=======
import React from 'react';
import classes from './Block.module.scss';

const block = () => <div className={classes.block}>123</div>
>>>>>>> a9f296a1361579fadfe2700712d30c59765c77ef

export default block
