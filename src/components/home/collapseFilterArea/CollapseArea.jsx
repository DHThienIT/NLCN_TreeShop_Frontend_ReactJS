import { Fragment, useEffect, useState } from "react";
// import ButtonListTable from "./collapseComponent/ButtonListTable";
// import CheckBoxListTable from "./collapseComponent/CheckBoxListTable";
// import MenuListTable from "./collapseComponent/MenuListTable";
import PriceListFilterTable from "./collapseComponent/PriceListFilterTable";
import PlantingPlaceListFilterTable from "./collapseComponent/PlantingPlaceListFilterTable";
import ColorListFilterTable from "./collapseComponent/ColorListFilterTable"
import MinMaxTable from "./collapseComponent/MinMaxTable";

import { priceList, plantingPlaceList, ColorList } from "./initState"
import TreeSearchService from "../../../services/treeSearch.service";
import { useNavigate } from "react-router-dom";

const CollapseArea = ({ filterTableUsed, onChangePathName, onFilterTextChange }) => {
    
    const navigate = useNavigate()
    // const [priceListFilter, setPriceListFilter] = useState(priceList)
    const [plantingPlaceListFilter, setPlantingPlaceListFilter] = useState(plantingPlaceList)
    const [colorListFilter, setColorListFilter] = useState(ColorList)
    const [turnOn, setTurnOn] = useState(false);

    useEffect(() => {
        if (filterTableUsed !== 'OnlyUseColorListFilterTable') {
            const newList = [...colorListFilter];
            newList[0].list.map((item) => {
                item.checked = false
                return null
            })
            setColorListFilter(newList)
        }
        if (filterTableUsed !== 'OnlyUseMinMaxTable') {
            setTurnOn(false)
        }
    }, [filterTableUsed])

    const handleTurnOn = () => {
        setTurnOn(!turnOn)
    }

    const handleCheckedPlantingPlace = (checkId) => {
        onChangePathName('Lọc theo vị trí kho')
        const newList = [...plantingPlaceListFilter];
        newList[0].list[checkId].checked = !plantingPlaceListFilter[0].list[checkId].checked;
        setPlantingPlaceListFilter(newList)
    }

    const handleCheckedColor = (checkId) => {
        onChangePathName('Lọc theo đặc sắc màu cây')
        const newList = [...colorListFilter];
        newList[0].list[checkId].checked = !colorListFilter[0].list[checkId].checked;
        setColorListFilter(newList)

        const listEColor = colorListFilter[0].list.map((Ecolor) => {
            if (Ecolor.checked)
                return (Ecolor.EColor)
            else return 'NONE'
        })

        TreeSearchService.searchTreesByColor(listEColor).then(
            (response) => {
                if (!response.data) navigate('/data')
                else navigate('/data', { state: { listTreeFromColorListFilterTable: response.data } })
            }
        )
    }

    return (
        <div onClick={() => onFilterTextChange()}>
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
                <PriceListFilterTable
                    priceList={priceList}
                    filterTableUsed={filterTableUsed}
                    onChangePathName={onChangePathName}
                />
                <MinMaxTable
                    turnOn={turnOn}
                    onTurnOn={handleTurnOn}
                    onChangePathName={onChangePathName}
                />
                <PlantingPlaceListFilterTable
                    plantingPlaceListFilter={plantingPlaceListFilter}
                    onCheckedPlantingPlace={handleCheckedPlantingPlace}
                />
                {/* <CheckBoxListTable />
                <MenuListTable />
                <ButtonListTable /> */}
                <ColorListFilterTable
                    colorListFilter={colorListFilter}
                    onCheckedColor={handleCheckedColor}
                    onChangePathName={onChangePathName}
                />
            </div>
        </div>
    )
}

export default CollapseArea;