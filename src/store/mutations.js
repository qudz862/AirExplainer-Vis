export default {
  setData (state, payload) {
    const { field, data } = payload
    switch (field) {
      case 'point_loc':
        if (state.pointLocs !== data) {
          state.pointLocs = data
          state.mapPointsUpdate += 1
        }
        break
      case 'select_point':
        if (state.selectedPoints !== data) {
          state.selectedPoints = data
        }
        break
      case 'city_loc':
        if (state.cityLocs !== data) {
          state.cityLocs = data
          state.mapCitiesUpdate += 1
        }
        break
      case 'select_city':
        if (state.selectedCities !== data) {
          state.selectedCities = data
        }
        break
      case 'select_group':
          if (state.selectedGroup !== data) {
            state.selectedGroup = data
            state.mapCitiesUpdate += 1
          }
          break
      case 'select_city_time':
          if (state.cityTimeRange !== data) {
            state.cityTimeRange = data
          }
          break
      case 'select_point_time':
          if (state.pointTimeRange !== data) {
            state.pointTimeRange = data
          }
          break
      case 'change_input_feature_city':
          if (state.selInputFeatureCity !== data) {
            state.selInputFeatureCity = data
          }
          break
      case 'change_input_feature_point':
          if (state.selInputFeaturePoint !== data) {
            state.selInputFeaturePoint = data
          }
          break
      case 'change_output_feature_city':
          if (state.selOutputFeatureCity !== data) {
            state.selOutputFeatureCity = data
          }
          break
      case 'change_output_feature_point':
          if (state.selOutputFeaturePoint !== data) {
            state.selOutputFeaturePoint = data
          }
          break
      case 'train_model':
          if (state.model_train_result !== data) {
            state.model_train_result = data
          }
          break
      case 'save_sel_data':
          if (state.saveSelDataState !== data) {
            state.saveSelDataState = data
          }
          break
      case 'existed_data_names':
          if (state.existedDataNameList !== data) {
            state.existedDataNameList = data
          }
          break
      default:
        break
    }
  }
}