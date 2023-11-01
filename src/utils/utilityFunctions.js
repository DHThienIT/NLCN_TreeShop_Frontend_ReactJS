import TreeService from '../services/tree.service'

const getListTree = (page, sortBy) => {
    let list
    TreeService.getAllListTree(page, sortBy).then(
        (response) => {
            console.log(response);
            list = response.data.content
        }
    )
    return list
}

const getNumberOfTree = () => {
    TreeService.getNumberOfTrees().then(
        (response) => {
            console.log(response);
            return response.data
        }
    )
}

const handleScrollToTop = (page) => {
    window.scrollTo({
      top: 200,
      behavior: "smooth"
    });
  };

const UtilityFunctions = {
    getListTree,
    getNumberOfTree,
    handleScrollToTop,
}

export default UtilityFunctions
