export default {
  // 选择空间相关的变量
  mapPointsUpdate: 0,
  pointLocs: [],
  selectedPoints: [],
  mapCitiesUpdate: 0,
  cityLocs: [],
  selectedCities: [],
  selectedGroup: "",
  // 选择时间相关的变量
  cityTimeRange: {
    "start": "2015-01-05",
    "end": "2016-01-03"
  },
  pointTimeRange: {
    "start": "2013-01-01",
    "end": "2018-12-31"
  },
  selInputFeatureCity: ['PM2.5', 'PM10', 'SO2', 'NO2', 'CO', 'O3'],
  selInputFeaturePoint: {
    air: ['PM2.5', 'PM10', 'SO2', 'NO2', 'CO', 'O3'],
    climate: ['U', 'V', 'TEMP', 'RH', 'PSFC', 'boundary_layer_h'],
    space: ['lat', 'lon', 'elevation', 'vegetation_index'],
    pollution_source: {
      pollutant: ['BC', 'CO', 'CO2', 'NH3', 'NOx', 'OC', 'PM25', 'PMcoarse', 'SO2', 'VOC'],
      source: ['agriculture', 'industry', 'power', 'residential', 'transportation']
    }
  },
  selOutputFeatureCity: ['PM2.5', 'PM10', 'SO2', 'NO2', 'CO', 'O3'],
  selOutputFeaturePoint: ['PM2.5', 'PM10', 'SO2', 'NO2', 'CO', 'O3'],
  model_train_result: {},
  saveSelDataState: '',
  existedDataNameList: []
}
