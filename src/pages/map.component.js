import React from 'react'
import mapworld from '../assets/map-world.png'
import maprussia from '../assets/map-russia.png'

const MapPage = () => {
    return <>
        <div align="center">
        <img src={mapworld} width="80%"/>
        </div>
        <div align="center">
        <img src={maprussia} width="80%"/>
        </div>
        </>
} 

export default MapPage;