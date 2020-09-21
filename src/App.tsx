import React from 'react'
import './App.css'
import { Map } from './components/map/Map'
import { PieChartAppr } from './components/pieChartAppropriations/PieChartAppr'
import { Filters } from "./components/filters/filters";
import { InfoBoxFixedWrapper } from "./components/infoBoxFixedWrapper/InfoBoxFixedWrapper";
import { ColorMap } from "./components/colorMap/ColorMap";
import { GrandsList } from "./components/grandsList/GrandsList";
import { GrantInfoBox } from "./components/grantInfoBox/GrantInfoBox";

function App() {
  return (
    <>
      <section id="map">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9">
              <Map/>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
              <Filters/>
              <GrandsList/>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 x-center">
              <PieChartAppr/>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 x-center">
              <ColorMap/>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 x-center">
              <InfoBoxFixedWrapper/>
            </div>
          </div>
          <div className="row">
            <GrantInfoBox/>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
