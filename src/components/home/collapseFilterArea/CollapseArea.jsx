// import { Fragment, useEffect, useState } from "react";
// import ButtonListTable from "./collapseComponent/ButtonListTable";
// import CheckBoxListTable from "./collapseComponent/CheckBoxListTable";
// import MenuListTable from "./collapseComponent/MenuListTable";
import PriceListFilterTable from "./collapseComponent/PriceListFilterTable";
import PlantingPlaceListFilterTable from "./collapseComponent/PlantingPlaceListFilterTable";
import ColorListFilterTable from "./collapseComponent/ColorListFilterTable"
import MinMaxTable from "./collapseComponent/MinMaxTable";

const CollapseArea = () => {
    return (
        <div>
            <button
                className="btn btn-outline-secondary mb-3 w-100  d-lg-none"
                data-bs-toggle="collapse"
                data-bs-target="#aside_filter"
            >
                Show filter
            </button>
            <div
                id="aside_filter"
                className="collapse card d-lg-block mb-5"
            >
                <PriceListFilterTable />
                <MinMaxTable />
                <PlantingPlaceListFilterTable />
                {/* <CheckBoxListTable />
                <MenuListTable />
                <ButtonListTable /> */}
                <ColorListFilterTable />
            </div>
        </div>
    )
}

export default CollapseArea;