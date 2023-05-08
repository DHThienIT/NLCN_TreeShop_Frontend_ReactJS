import Pathway from "./Pathway";
import CollapseArea from "./collapseFilterArea/CollapseArea";
import { memo } from 'react'
import TreesGridArea from "./treesGrid/TreesGridArea";
import { useLocation } from "react-router-dom";

const Data = ({ currentUser, text, pathName, listTree, listTrackingListTree, numberOfTree, restartListTree, handleRestartTrackingList, onChangePathName, onFilterTextChange, onUseCollapseFilter }) => {
    const location = useLocation();
    const { listTreeFromPriceListFilterTable, listTreeFromColorListFilterTable, listTreeFromMinMaxTable } = location.state || {}
    // console.log('X-1111 : ', text)
    if (listTreeFromPriceListFilterTable || listTreeFromColorListFilterTable || listTreeFromMinMaxTable) onUseCollapseFilter()
        if (listTreeFromPriceListFilterTable) listTree = listTreeFromPriceListFilterTable
    if (listTreeFromColorListFilterTable) listTree = listTreeFromColorListFilterTable

    if (listTreeFromMinMaxTable && listTreeFromMinMaxTable.length !== 0) listTree = listTreeFromMinMaxTable

    let filterTableUsed = ''
    if (listTreeFromPriceListFilterTable && !listTreeFromColorListFilterTable && !listTreeFromMinMaxTable) filterTableUsed = 'OnlyUsePriceListFilterTable'
    if (!listTreeFromPriceListFilterTable && listTreeFromColorListFilterTable && !listTreeFromMinMaxTable) filterTableUsed = 'OnlyUseColorListFilterTable'
    if (!listTreeFromPriceListFilterTable && !listTreeFromColorListFilterTable && listTreeFromMinMaxTable) filterTableUsed = 'OnlyUseMinMaxTable'

    return (
        <div className="home-section">
            <section className="bg-primary py-5">
                <Pathway
                    pathName={pathName}
                />
            </section>
            <section className="padding-y">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <CollapseArea
                                filterTableUsed={filterTableUsed}
                                onChangePathName={onChangePathName}
                                onFilterTextChange={onFilterTextChange}
                            />
                        </div>
                        <div className="col-lg-9">
                            <TreesGridArea
                                listTree={listTree}
                                currentUser={currentUser}
                                numberOfTree={numberOfTree}
                                listTrackingListTree={listTrackingListTree}
                                handleRestartTrackingList={handleRestartTrackingList}
                                restartListTree={restartListTree}
                            />
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}

export default memo(Data);