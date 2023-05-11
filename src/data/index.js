import * as d3 from 'd3'

const cityGroup = {
    "jing-jin-ji": [],
    "chang-san-jiao": [],
    "fen-wei": [],
    "zhu-san-jiao": [],
    "cheng-yu": []
}

// const aqiColorScheme_green = d3.scaleLinear()
//     .domain([0, 50])
//     .range(['#01e400', d3.interpolateRdYlGn(0.9)])
// const aqiColorScheme_orange = d3.scaleLinear()
//     .domain([50, 150])
//     .range(['#fee493', '#ff7e00'])
// const aqiColorScheme_red = d3.scaleLinear()
//     .domain([150, 200])
//     .range(['#f34b36', '#ba1419'])
// const aqiColorScheme_purple = d3.scaleLinear()
//     .domain([200, 300])
//     .range(['#766ab0', '#4b1787'])
// const aqiColorScheme_deepRed = d3.scaleLinear()
//     .domain([300, 500])
//     .range(['#880000', '#440000'])

const aqiColorScheme_green = d3.scaleQuantize()
    .domain([0, 50])
    .range(['#66c2a4', '#41ae76', '#238b45'])

function aqiColorScheme_orange(val) {
    let aqiColorScheme_50_to_100 = d3.scaleQuantize()
        .domain([50, 100])
        .range(['#fed976', '#fec44f', '#feb24c']) // , '#fe9929'
    let aqiColorScheme_100_to_150 = d3.scaleQuantize()
        .domain([100, 150])
        // .range(['#fdae6b', '#fd8d3c', '#f16913'])
        .range(['#fe9929', '#ec7014', '#cc4c02']) // , '#993404'
    if (val >= 50 && val < 100) return aqiColorScheme_50_to_100(val)
    else if (val >= 100 && val < 150) return aqiColorScheme_100_to_150(val)
}
const aqiColorScheme_red = d3.scaleQuantize()
    .domain([150, 200])
    .range(['#fb6a4a', '#ef3b2c', '#cb181d'])
const aqiColorScheme_purple = d3.scaleQuantize()
    .domain([200, 300])
    .range(['#807dba', '#6a51a3', '#54278f', '#3f007d'])
const aqiColorScheme_deepRed = d3.scaleQuantize()
    .domain([300, 500])
    .range(['#a50f15', '#67000d'])

const aqiColorScheme = [
    aqiColorScheme_green,
    aqiColorScheme_orange,
    aqiColorScheme_red,
    aqiColorScheme_purple,
    aqiColorScheme_deepRed
]

const inputFeatureCity = ['PM2.5', 'PM10', 'SO2', 'NO2', 'CO', 'O3']
const inputFeaturePoint = {
    air: ['PM2.5', 'PM10', 'SO2', 'NO2', 'CO', 'O3'],
    climate: ['U', 'V', 'TEMP', 'RH', 'PSFC', 'boundary_layer_h'],
    space: ['lat', 'lon', 'elevation', 'vegetation_index'],
    pollution_source: {
        pollutant: ['BC', 'CO', 'CO2', 'NH3', 'NOx', 'OC', 'PM25', 'PMcoarse', 'SO2', 'VOC'],
        source: ['total', 'agriculture', 'industry', 'power', 'residential', 'transportation']
    }
}

const outputFeatureCity = ['PM2.5', 'PM10', 'SO2', 'NO2', 'CO', 'O3']
const outputFeaturePoint = ['PM2.5', 'PM10', 'SO2', 'NO2', 'CO', 'O3']

// const valColorScheme = ['#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b']
const valColorScheme = ['#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b']

export {
    cityGroup,
    aqiColorScheme,
    valColorScheme,
    inputFeatureCity,
    outputFeatureCity,
    inputFeaturePoint,
    outputFeaturePoint
}
  