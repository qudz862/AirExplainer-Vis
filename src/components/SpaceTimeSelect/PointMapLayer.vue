<template>
  <div class='outer-container'>
    <ul class="nav nav-tabs">
      <li class="nav-item"><a class="nav-link active"  data-bs-toggle="tab" href="#province_city">Province & city</a></li>
      <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#urban_agglomeration">Urban agglomerations</a></li>
      <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#natural">Natural regions</a></li>
      <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#climate">Climate regions</a></li>
      <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#vegetation">Vegetation regions</a></li>
    </ul>
    <div class="tab-content">
      <div class="tab-pane fade show active" id="province_city">
        <div class="input-group mb-3">
          <select class="form-select" v-model="sel_region.sel_province">
            <option>Choose province</option>
            <option v-for="(value, key) in province_city" :value="key">{{ key }}</option>
          </select>
          <select class="form-select" v-model="sel_region.sel_city">
            <option>Choose city</option>
            <option v-for="item in province_city[sel_region.sel_province]" :value="item">{{ item }}</option>
          </select>
        </div>
      </div>
      <div class="tab-pane fade" id="natural">
          <div class="input-group mb-3">
          <select class="form-select" v-model="sel_region.sel_natural_region">
            <option>Choose natural region</option>
            <option v-for="(value, key) in natural_division" :value="key">{{ key }}</option>
          </select>
          <select class="form-select" v-model="sel_region.sel_natural_sub_region">
            <option>Choose natural sub-region</option>
            <option v-for="(value, key) in natural_division[sel_region.sel_natural_region]" :value="key">{{ key }}</option>
          </select>
          <select class="form-select" v-model="sel_region.sel_natural_zone">
            <option>Choose natural zone</option>
            <option v-for="item in natural_zone_list" :value="item">{{ item }}</option>
          </select>
        </div>
      </div>
      <div class="tab-pane fade" id="climate">
        <div class="input-group mb-3">
          <select class="form-select" v-model="sel_region.sel_climate_region">
            <option>Choose climate region</option>
            <option v-for="(value, key) in climate_division" :value="key">{{ key }}</option>
          </select>
          <select class="form-select" v-model="sel_region.sel_climate_zone">
            <option>Choose climate zone</option>
            <option v-for="item in climate_division[sel_region.sel_climate_region]" :value="item">{{ item }}</option>
          </select>
        </div>
      </div>
      <div class="tab-pane fade" id="vegetation">
        <div class="input-group mb-3">
          <select class="form-select" v-model="sel_region.sel_vegetation_region">
            <option>Choose vegetation region</option>
            <option v-for="(value, key) in vegetation_division" :value="key">{{ key }}</option>
          </select>
          <select class="form-select" v-model="sel_region.sel_vegetation_zone">
            <option selected>Choose vegetation zone</option>
            <option v-for="item in vegetation_division[sel_region.sel_vegetation_region]" :value="item">{{ item }}</option>
          </select>
        </div>
      </div>
      <div class="tab-pane fade" id="urban_agglomeration">
        <div class="input-group mb-3">
          <select class="form-select" v-model="sel_region.sel_urban_agglomeration">
            <option>Choose urban agglomeration</option>
            <option v-for="(value, key) in urban_agglomeration" :value="key">{{ key }}</option>
          </select>
        </div>
      </div>
    </div>

    <div class="st-sel-block">
      <div class="map-container" id="map-container"></div>
      <!-- <div>选中了{{ sel_point_num }}个点</div> -->
      <div class="time-var-block">
        <div class="time-config-content">
          <div>Time range</div>
          <div class="form-group">
            <div class="form-row">
                <div>Start: </div> 
                <input type="date" name="startTime" class="form-control" 
                max="2018-12-31" min="2013-01-01" 
                v-model="startTime" @change="onStartTimeChange()">
            </div>
            <div class="form-row">
                <div>End: </div> 
                <input type="date" name="endTime" class="form-control" 
                max="2018-12-31" min="2013-01-01" 
                v-model="endTime" @change="onEndTimeChange()">
            </div>
          </div>
        </div>
      <!-- <div class="var-select">
        <div>Input Features:</div>
        <div>Air quality: </div>
        <div class='var-container'>
          <div v-for="item in inputFeaturePoint.air" class="form-check">
            <input class="form-check-input" type="checkbox" :value="item" v-model="curInputFeatures.air" @change="onInputFeatureChange">
            <label class="form-check-label">{{ item }}</label>
          </div>
        </div>
        <div>Climate: </div>
        <div class='var-container'>
          <div v-for="item in inputFeaturePoint.climate" class="form-check">
            <input class="form-check-input" type="checkbox" :value="item" v-model="curInputFeatures.climate" @change="onInputFeatureChange">
            <label class="form-check-label">{{ item }}</label>
          </div>
        </div>
        <div>Space: </div>
        <div class='var-container'>
          <div v-for="item in inputFeaturePoint.space" class="form-check">
            <input class="form-check-input" type="checkbox" :value="item" v-model="curInputFeatures.space" @change="onInputFeatureChange">
            <label class="form-check-label">{{ item }}</label>
          </div>
        </div>
        <div>Pollution source: </div>
        <div class='var-container'>
          Pollutant:
          <div v-for="item in inputFeaturePoint.pollution_source.pollutant" class="form-check">
            <input class="form-check-input" type="checkbox" :value="item" v-model="curInputFeatures.pollution_source.pollutant" @change="onInputFeatureChange">
            <label class="form-check-label">{{ item }}</label>
          </div>
          Source:
          <div v-for="item in inputFeaturePoint.pollution_source.source" class="form-check">
            <input class="form-check-input" type="checkbox" :value="item" v-model="curInputFeatures.pollution_source.source" @change="onInputFeatureChange">
            <label class="form-check-label">{{ item }}</label>
          </div>
        </div>

        <div>Output Features:</div>
        <div class='var-container'>
          <div v-for="item in outputFeaturePoint" class="form-check">
            <input class="form-check-input" type="checkbox" :value="item" v-model="curOutputFeatures" @change="onOutputFeatureChange">
            <label class="form-check-label">{{ item }}</label>
          </div>
        </div>
      </div> -->
      <div class='data-save-block'>
        <div>Data identifier</div>
        <input type="text" class="form-control" :placeholder="sel_data_name" v-model="sel_data_name">
        <div>Data description</div>
        <textarea class="form-control" rows="5" v-model="sel_data_description" placeholder=""></textarea>
        <button id="save-data-btn" type="button" class="btn btn-primary" @click="saveSelData">Save selected data</button>
      </div>
    </div>
    <!-- <div>选中了{{ sel_day_num+1 }}天</div> -->
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from "vue";
import mapboxgl from "mapbox-gl";
import turf from 'turf'
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { useStore } from 'vuex'
import getData from '@/services'
import { inputFeaturePoint, outputFeaturePoint } from '@/data'
import { province_city, natural_division, climate_division, vegetation_division, urban_agglomeration } from '@/data/region_division.js';

const store = useStore(),
    state = store.state
getData(store, 'point_loc')
const stateObj = computed(() => state).value

let curInputFeatures = ref({
  air: [...stateObj.selInputFeaturePoint.air],
  climate: [...stateObj.selInputFeaturePoint.climate],
  space: [...stateObj.selInputFeaturePoint.space],
  pollution_source: {
    pollutant: [...stateObj.selInputFeaturePoint.pollution_source.pollutant],
    source: [...stateObj.selInputFeaturePoint.pollution_source.source]
  }
})
let curOutputFeatures = ref([...stateObj.selOutputFeaturePoint])

const onInputFeatureChange = () => {
  store.commit('setData', {
    field: 'change_input_feature_point',
    data: curInputFeatures.value
  })
}

const onOutputFeatureChange = () => {
  store.commit('setData', {
    field: 'change_output_feature_point',
    data: curOutputFeatures.value
  })
}

const trainModel = () => {
  getData(store, 'train_model', 'point', JSON.stringify(stateObj.selectedPoints), JSON.stringify(stateObj.pointTimeRange), JSON.stringify(stateObj.selInputFeaturePoint), JSON.stringify(stateObj.selOutputFeaturePoint))
}

let map
let draw
let pointList = []

mapboxgl.accessToken = 'pk.eyJ1IjoiZGV6aGFudmlzIiwiYSI6ImNraThnYWoxcDA1aXkycnMzMGxhcDcxeGgifQ.pbnOr8oKR894OJ3seHIayg'

const startTime = ref("2013-01-01")
const endTime = ref("2018-12-31")


let sel_point_num = ref(0)
let sel_region_flag = false
let sel_region_type = ref('Arbitrary')

let sel_region = reactive({
  sel_province: 'Choose province',
  sel_city: 'Choose city',
  sel_natural_region: 'Choose natural region',
  sel_natural_sub_region: 'Choose natural sub-region',
  sel_natural_zone: 'Choose natural zone',
  sel_climate_region: 'Choose climate region',
  sel_climate_zone: 'Choose climate zone',
  sel_vegetation_region: 'Choose vegetation region',
  sel_vegetation_zone: 'Choose vegetation zone',
  sel_urban_agglomeration: 'Choose urban agglomeration'
})

let natural_zone_list = ref([])
let sel_filter = ["in", "loc_id", '']

watch(()=>sel_region.sel_city, (newVal, oldVal) => {
  if (sel_region.sel_city != 'Choose city') {
    sel_region_type.value = `City-${sel_region.sel_city}(${sel_region.sel_province})`
    sel_filter = ["==", "city", sel_region.sel_city]
  } else if (sel_region.sel_province != 'Choose province') {
    sel_region_type.value = `Province-${sel_region.sel_province}`
    sel_filter = ["==", "province", sel_region.sel_province]
  }
})

watch(()=>sel_region.sel_province, (newVal, oldVal) => {
  sel_region.sel_city = "Choose city"
  if (sel_region.sel_province != 'Choose province') {
    sel_region_type.value = `Province-${sel_region.sel_province}`
    sel_filter = ["==", "province", sel_region.sel_province]
    sel_region.sel_natural_region = "Choose natural region"
    sel_region.sel_natural_sub_region = "Choose natural sub-region"
    sel_region.sel_natural_zone = "Choose natural zone"
    sel_region.sel_climate_region = "Choose climate region"
    sel_region.sel_climate_zone = "Choose climate zone"
    sel_region.sel_vegetation_region = "Choose vegetation region"
    sel_region.sel_vegetation_zone = "Choose vegetation zone"
    sel_region.sel_urban_agglomeration = 'Choose urban agglomeration'
  }
})

watch(()=>sel_region.sel_natural_zone, (newVal, oldVal) => {
  if (sel_region.sel_natural_zone != "Choose natural zone") {
    sel_region_type.value = `Natural-${sel_region.sel_natural_region}-${sel_region.sel_natural_sub_region}-${sel_region.sel_natural_zone}`
    sel_filter = ["==", "natural_zone", sel_region.sel_natural_zone]
  } else if (sel_region.sel_natural_sub_region == "Choose natural sub-region") {
    sel_region_type.value = `Natural-${sel_region.sel_natural_region}-${sel_region.sel_natural_sub_region}`
    sel_filter = ["==", "natural_sub_region", sel_region.sel_natural_sub_region]
  }
})

watch(()=>sel_region.sel_natural_sub_region, (newVal, oldVal) => {
  sel_region.sel_natural_zone = "Choose natural zone"
  if (sel_region.sel_natural_sub_region != "Choose natural sub-region") {
    natural_zone_list.value = natural_division[sel_region.sel_natural_region][sel_region.sel_natural_sub_region]
    sel_region_type.value = `Natural-${sel_region.sel_natural_region}-${sel_region.sel_natural_sub_region}`
    sel_filter = ['all', ["==", ["get","natural_region"], sel_region.sel_natural_region], ["==", ["get","natural_sub_region"], sel_region.sel_natural_sub_region]]
  }
  else {
    natural_zone_list.value = []
    if (sel_region.sel_natural_region != "Choose natural region") {
      sel_region_type.value = `Natural-${sel_region.sel_natural_region}`  
      sel_filter = ["==", "natural_region", sel_region.sel_natural_region]
    }
  }
})

watch(()=>sel_region.sel_natural_region, (newVal, oldVal) => {
  sel_region.sel_natural_sub_region = "Choose natural sub-region"
  sel_region.sel_natural_zone = "Choose natural zone"
  if (sel_region.sel_natural_region != "Choose natural region") {
    sel_region_type.value = `Natural-${sel_region.sel_natural_region}`
    sel_filter = ["==", "natural_region", sel_region.sel_natural_region]
    sel_region.sel_province = 'Choose province'
    sel_region.sel_city = "Choose city"
    sel_region.sel_climate_region = "Choose climate region"
    sel_region.sel_climate_zone = "Choose climate zone"
    sel_region.sel_vegetation_region = "Choose vegetation region"
    sel_region.sel_vegetation_zone = "Choose vegetation zone"
    sel_region.sel_urban_agglomeration = 'Choose urban agglomeration'
  }
})

watch(()=>sel_region.sel_climate_zone, (newVal, oldVal) => {
  if (sel_region.sel_climate_zone != "Choose climate zone") {
    sel_region_type.value = `Climate-${sel_region.sel_climate_region}-${sel_region.sel_climate_zone}`
    sel_filter = ["==", "climate_zone", sel_region.sel_climate_zone]
  } else if (sel_region.sel_climate_region != "Choose climate region") {
    sel_region_type.value = `Climate-${sel_region.sel_climate_region}`
    sel_filter = ["==", "climate_region", sel_region.sel_climate_region]
  }
})

watch(()=>sel_region.sel_climate_region, (newVal, oldVal) => {
  sel_region.sel_climate_zone = "Choose climate zone"
  if (sel_region.sel_climate_region != "Choose climate region") {
    sel_region_type.value = `Climate-${sel_region.sel_climate_region}`
    sel_filter = ["==", "climate_region", sel_region.sel_climate_region]
    sel_region.sel_province = 'Choose province'
    sel_region.sel_city = "Choose city"
    sel_region.sel_natural_region = "Choose natural region"
    sel_region.sel_natural_sub_region = "Choose natural sub-region"
    sel_region.sel_natural_zone = "Choose natural zone"
    sel_region.sel_vegetation_region = "Choose vegetation region"
    sel_region.sel_vegetation_zone = "Choose vegetation zone"
    sel_region.sel_urban_agglomeration = 'Choose urban agglomeration'
  }
})

watch(()=>sel_region.sel_vegetation_zone, (newVal, oldVal) => {
  if (sel_region.sel_vegetation_zone != "Choose vegetation zone") {
    sel_region_type.value = `Vegetation-${sel_region.sel_vegetation_region}-${sel_region.sel_vegetation_zone}`
    sel_filter = ["==", "vegetation_zone", sel_region.sel_vegetation_zone]
  } else if (sel_region.sel_vegetation_region != "Choose vegetation region") {
    sel_region_type.value = `Vegetation-${sel_region.sel_vegetation_region}`
    sel_filter = ["==", "vegetation_region", sel_region.sel_vegetation_region]
  }
})

watch(()=>sel_region.sel_vegetation_region, (newVal, oldVal) => {
  sel_region.sel_vegetation_zone = "Choose vegetation zone"
  if (sel_region.sel_vegetation_region != "Choose vegetation region") {
    sel_region_type.value = `Vegetation-${sel_region.sel_vegetation_region}`
    sel_filter = ["==", "vegetation_region", sel_region.sel_vegetation_region]
    sel_region.sel_province = 'Choose province'
    sel_region.sel_city = "Choose city"
    sel_region.sel_natural_sub_region = "Choose natural region"
    sel_region.sel_natural_sub_region = "Choose natural sub-region"
    sel_region.sel_natural_zone = "Choose natural zone"
    sel_region.sel_climate_region = "Choose climate region"
    sel_region.sel_climate_zone = "Choose climate zone"
    sel_region.sel_urban_agglomeration = 'Choose urban agglomeration'
  }
})

watch(()=>sel_region.sel_urban_agglomeration, (newVal, oldVal) => {
  if (sel_region.sel_urban_agglomeration != "Choose urban agglomeration") {
    sel_region_type.value = `Agglomeration-${sel_region.sel_urban_agglomeration}`
    sel_filter = ["in", "city", ...urban_agglomeration[sel_region.sel_urban_agglomeration]]
    sel_region.sel_province = 'Choose province'
    sel_region.sel_city = "Choose city"
    sel_region.sel_natural_sub_region = "Choose natural region"
    sel_region.sel_natural_sub_region = "Choose natural sub-region"
    sel_region.sel_natural_zone = "Choose natural zone"
    sel_region.sel_climate_region = "Choose climate region"
    sel_region.sel_climate_zone = "Choose climate zone"
    sel_region.sel_vegetation_region = "Choose vegetation region"
    sel_region.sel_vegetation_zone = "Choose vegetation zone"
  }
})

let sel_day_num = computed(() => {
  let start_date = new Date(startTime.value)
  let end_date = new Date(endTime.value)
  return (end_date - start_date) / (1000 * 60 * 60 * 24)
})
let sel_data_name = computed(() => {
  let space_type = ''
  space_type = `${sel_region_type.value}-${sel_point_num.value}P`

  let reg = new RegExp("-","g");
  let name = `${space_type}_${startTime.value.replace(reg,"")}-${endTime.value.replace(reg,"")}`
  // for (let i in stateObj.selInputFeaturePoint) {
  //   for (let j = 0; j < stateObj.selInputFeaturePoint[i].length; ++j)
  //   name = name + '-' + stateObj.selInputFeaturePoint[i][j]
  // }
  // name = name + '_O'
  // for (let i in stateObj.selOutputFeaturePoint) {
  //   name = name + '-' + stateObj.selOutputFeaturePoint[i]
  // }
  return name
})

let sel_data_infor = computed(() => {
  let space_type = `${sel_region_type.value}-${sel_point_num.value}P`

  let infor = {
    'data_type': 'point',
    'data_name': sel_data_name._value,
    'data_description': sel_data_description.value,
    'selectedPoints': stateObj.selectedPoints,
    'selSpaceType': space_type,
    'timeRange': stateObj.pointTimeRange,
    'selInputFeaturePoint': stateObj.selInputFeaturePoint,
    'selOutputFeaturePoint': stateObj.selOutputFeaturePoint
  }

  return infor
})

// const train_data_rate = ref(70)
const sel_data_description = ref('')

const saveSelData = () => {
  getData(store, 'save_sel_data', JSON.stringify(sel_data_infor.value))
}

watch(()=>stateObj.saveSelDataState, (newVal, oldVal) => {
  console.log(stateObj.saveSelDataState);
})

const onStartTimeChange = () => {
    store.commit('setData', {
        field: 'select_point_time',
        data: {
            "start": startTime.value,
            "end": endTime.value
        }
    })
}

const onEndTimeChange = () => {
    store.commit('setData', {
        field: 'select_point_time',
        data: {
            "start": startTime.value,
            "end": endTime.value
        }
    })
}

function getLL(d) {
    return new mapboxgl.LngLat(+d.lng, +d.lat)
}

function project(d) {
    return map.project(getLL(d));
}

const initDraw = () => {
    draw = new MapboxDraw()
    // let navigation = new mapboxgl.NavigationControl()
    // let scale_ctl =  new mapboxgl.ScaleControl({
    //     maxWidth: 80,
    //     unit: 'imperial'
    // })
    // let full_screen_ctl = new mapboxgl.FullscreenControl()
    // map.addControl(navigation, 'bottom-right')
    // map.addControl(full_screen_ctl, 'bottom-right')
    // map.addControl(scale_ctl, 'bottom-right')

    map.addControl(draw, 'bottom-right')

    map.on('draw.create', updateArea)
    map.on('draw.update', updateArea)
    map.on('draw.delete', updateArea)
}

const updateArea = (e) => {
    //   map.setFilter("points-selected", ["==", "group", ""]);
      if (e.type === 'draw.delete') {
        map.setFilter("points-selected", ["in", "loc_id", ""]);
        // map.setFilter("points-selected", ["==", "group", ""]);
        pointList = []
        store.commit('setData', {
          field: 'select_point',
          data: pointList
        })
        return
      }

      var data = draw.getAll()
      if (data.features.length > 0) {
        var userPolygon = e.features[0];
        var polygonBoundingBox = turf.bbox(userPolygon);
        var southWest = [polygonBoundingBox[0], polygonBoundingBox[1]];
        var northEast = [polygonBoundingBox[2], polygonBoundingBox[3]];
        var northEastPointPixel = map.project(northEast);
        var southWestPointPixel = map.project(southWest);
        var features = map.queryRenderedFeatures([southWestPointPixel, northEastPointPixel], { layers: ['points'] });
        var filter = features.reduce(function(memo, feature) {
          if (! (undefined === turf.intersect(feature, userPolygon))) {
            // only add the property, if the feature intersects with the polygon drawn by the user
            // memo.push(feature.properties.title);
            memo.push(feature.properties.loc_id);
          }
          return memo;
        }, []);
        sel_filter = ["in", "loc_id", ...filter]
        sel_region_type.value == 'Arbitrary'
        pointList = filter
        store.commit('setData', {
          field: 'select_point',
          data: pointList
        })
        map.setFilter("points-selected", ["in", "loc_id", ...filter]);
      } else {
        // answer.innerHTML = '';
      }
    }

watch(()=>stateObj.selectedPoints, (newVal, oldVal) => {
  sel_point_num.value = stateObj.selectedPoints.length
})

watch(() => sel_region_type.value, (newVal, oldVal) => {
  map.setFilter("points-selected", sel_filter);
  let geometryList = map.querySourceFeatures('points', {
    sourceLayer: 'points-selected',
    filter: sel_filter
  });
  pointList = geometryList.map(item => item.properties.loc_id)
  store.commit('setData', {
    field: 'select_point',
    data: pointList
  })
})

onMounted(() => {
    map = new mapboxgl.Map({
        container: 'map-container',
        // style: 'mapbox://styles/dezhanvis/ckmcv57z60gjd17rq1jvowlcr',
        center: [105.605285,37.6],
        // pitch: 80,
        // bearing: 41,
        zoom: 5,
        style: 'mapbox://styles/mapbox/satellite-streets-v10',
        zoomControl: true
      })
    map._logoControl && map.removeControl(map._logoControl);  // 去除mapbox标志
    map.on('style.load', () => {
      console.log('aaaaaaaaaaa');
      map.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 256,
        'maxzoom': 14
        });
      map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 4 });
    });

    initDraw()
})

watch (() => stateObj.mapPointsUpdate, (oldVlaue, newValue) => {
    // map.on('load', () => {
        map.addSource("points", {
          "type": "geojson",
          "data": {
            "type": "FeatureCollection",
            "features": stateObj.pointLocs
          }
        })

        map.addLayer({
          "id": "points",
          "type": "circle",   /* symbol类型layer，一般用来绘制点*/
          "source": "points",
          paint: {
            'circle-radius': 3,
            'circle-color': '#fec006'
          }
        });

        map.addLayer({
          "id": "points-selected",
          "type": "circle",
          "source": "points",
          "paint": {
            'circle-radius': 3,
            'circle-color': '#eb6877'
          },
          "filter": ["in", "loc_id", '']  /* 过滤器，名字为空的数据才显示，也就是默认不使用该layer  */
        });
    // })
})

</script>

<style scoped>
@import url("https://api.tiles.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css");
@import url("https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.3.0/mapbox-gl-draw.css");

.outer-container {
  width: 1080px;
}

.map-container {
  /* margin: 0 auto; */
  /* position: absolute; */
  /* left: 300; */
  width: 600px;
  height: 480px;
  margin-right: 20px;
}

.time-config-content {
  /* width: 400px; */
}

.time-var-block {
  margin-right: 20px;
}

.time-var-block .form-row {
  width: 290px;
  /* margin: 0 auto; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  margin-bottom: 5px;
}

.time-var-block .form-control {
  width: 240px;
  font-size: 15px;
  padding: 0 4px;
  height: 28px;
}

#get-data-btn {
  width: 270px;
  height: 32px;
  padding: 2px 0px;
  margin-top: -3px;
  border: solid 1px #9a9a9a;
  border-radius: 16px;
  color: #333;
}

.data-save-block {
  width: 320px;
}

#save-data-btn {
  margin-top: 10px;
}

.var-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

#train-btn {
  width: 270px;
  height: 32px;
  padding: 2px 0px;
  margin-top: 14px;
  border: solid 1px #9a9a9a;
  border-radius: 16px;
  color: #333;
}

.nav {
  width: 860px;
}

.tab-content {
  width: 660px;
}

.st-sel-block {
  display: flex;
}

.time-var-block {
  width: 400px;
}
</style>