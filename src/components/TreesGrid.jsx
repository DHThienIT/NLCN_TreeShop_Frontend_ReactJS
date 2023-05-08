import React from "react";
import TreeItem from './TreeItem';
import styles from './productstyles.module.css';

const TreesGrid = (props) => {
  const foundTrees = [];
  
  props.trees.forEach((tree) => {
    if (tree.treeName.indexOf(props.filterText) === -1) {
      return;
    }
    // Correct! Key should be specified inside the array.
    foundTrees.push(<TreeItem key={tree.treeName} tree={tree} currentUser={props.currentUser} />);
  })

  return (
    <main className={styles.main_block}>
      <div style={{ fontWeight: 'bold' }}> Số sản phẩm tìm thấy: {foundTrees.length}</div>
      <section className={styles.grid_container}>
        {foundTrees}
      </section>
    </main>
  );
};

export default TreesGrid;
