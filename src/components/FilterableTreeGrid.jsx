import React, { useState, useEffect } from "react";

import Search from './Search';
import TreesGrid from './TreesGrid';
import styles from './productstyles.module.css';
import RootService from "../services/rootService";

const FilterableTreeGrid = (props) => {
  const [trees, setTrees] = useState([]);
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    RootService.TreeService.listTree().then(
      (response) => {
        setTrees(response.data);
      },
      (error) => {
        const _trees = [
          (error.response && error.response.data) ||
          error.message ||
          error.toString()];

        setTrees(_trees);
      }
    );
  }, []);

  const handleChangeFilterTreesByName = (treeName) => {
    setFilterName(treeName);
  }

  return (
    <main className={styles.main_block}>
      <Search filterText={filterName}
        onFilterTextChange={handleChangeFilterTreesByName} />

      <TreesGrid
        trees={trees}
        filterText={filterName}
        currentUser={props.currentUser}
      />
    </main>
  );
};

export default FilterableTreeGrid;
