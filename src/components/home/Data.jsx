import Pathway from "./Pathway";
import CollapseArea from "./collapseFilterArea/CollapseArea";
import { memo } from 'react'
import TreesGridArea from "./treesGrid/TreesGridArea";

const Data = () => {
    return (
        <div className="home-section">
            <section className="bg-primary py-5">
                <Pathway />
            </section>
            <section className="padding-y">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <CollapseArea />
                        </div>
                        <div className="col-lg-9">
                            <TreesGridArea />
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}

export default memo(Data);