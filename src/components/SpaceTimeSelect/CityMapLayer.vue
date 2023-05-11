<template>
  <div class='outer-container'>
    <div class="ua-dropdown"> 
      <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{ selUrbanAgglomeration }}</button>
      <div id="dropdown-menu-ua" class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <button type="button" class="btn btn-light" @click="selRegion('jing-jin-ji')">Jing-Jin-Ji Region <span class="badge bg-secondary">31</span></button>
        <button type="button" class="btn btn-light" @click="selRegion('chang-san-jiao')">Chang-San-Jiao Region <span class="badge bg-secondary">41</span></button>
        <button type="button" class="btn btn-light" @click="selRegion('fen-wei')">Fen-Wei Plain Region <span class="badge bg-secondary">11</span></button>
        <button type="button" class="btn btn-light" @click="selRegion('zhu-san-jiao')">Zhu-San-Jiao Region <span class="badge bg-secondary">15</span></button>
        <button type="button" class="btn btn-light" @click="selRegion('cheng-yu')">Cheng-Yu Region <span class="badge bg-secondary">16</span></button>
      </div>
    </div>
    <div class="map-city-container" id="map-city-container"></div>
    <div class="time-config-content">
        <div class="form-group">
            <div class="form-row">
                <div>Start: </div> 
                <input type="date" name="startTime" class="form-control" 
                max="2016-01-03" min="2015-01-05" 
                v-model="startTime" @change="onStartTimeChange()">
            </div>
            <div class="form-row">
                <div>End: </div> 
                <input type="date" name="endTime" class="form-control" 
                max="2016-01-03" min="2015-01-05" 
                v-model="endTime" @change="onEndTimeChange()">
            </div>
        </div>
    </div>
    <div class="var-select">
      <div>Input Features:</div>
      <div class='var-container'>
        <div v-for="item in inputFeatureCity" class="form-check">
          <input class="form-check-input" type="checkbox" :value="item" v-model="curInputFeatures" @change="onInputFeatureChange">
          <label class="form-check-label">{{ item }}</label>
        </div>
      </div>
      <div>Output Features:</div>
      <div class='var-container'>
        <div v-for="item in outputFeatureCity" class="form-check">
          <input class="form-check-input" type="checkbox" :value="item" v-model="curOutputFeatures" @change="onOutputFeatureChange">
          <label class="form-check-label">{{ item }}</label>
        </div>
      </div>
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
import { cityGroup, inputFeatureCity, outputFeatureCity } from '@/data'

const store = useStore(),
    state = store.state
getData(store, 'city_loc')
const stateObj = computed(() => state).value

let curInputFeatures = ref([...stateObj.selInputFeatureCity])
let curOutputFeatures = ref([...stateObj.selOutputFeatureCity])

const onInputFeatureChange = () => {
  store.commit('setData', {
    field: 'change_input_feature_city',
    data: curInputFeatures.value
  })
}

const onOutputFeatureChange = () => {
  store.commit('setData', {
    field: 'change_output_feature_city',
    data: curOutputFeatures.value
  })
}

// watch(() => stateObj.selInputFeatureCity, (newVal, oldVal) => {
//   console.log(stateObj.selInputFeatureCity);
// })

// watch(() => stateObj.selOutputFeatureCity, (newVal, oldVal) => {
//   console.log(stateObj.selOutputFeatureCity);
// })

let map
let draw
let cityList = []

mapboxgl.accessToken = 'pk.eyJ1IjoiZGV6aGFudmlzIiwiYSI6ImNraThnYWoxcDA1aXkycnMzMGxhcDcxeGgifQ.pbnOr8oKR894OJ3seHIayg'

const startTime = ref("2015-01-05")
const endTime = ref("2016-01-03")

const onStartTimeChange = () => {
    store.commit('setData', {
        field: 'select_city_time',
        data: {
            "start": startTime.value,
            "end": endTime.value
        }
    })
    // console.log(stateObj.selTime);
}

const onEndTimeChange = () => {
    store.commit('setData', {
        field: 'select_city_time',
        data: {
            "start": startTime.value,
            "end": endTime.value
        }
    })
    // console.log(stateObj.selTime);
}

function getLL(d) {
    return new mapboxgl.LngLat(+d.lng, +d.lat)
}

function project(d) {
    return map.project(getLL(d));
} 

let selUrbanAgglomeration = ref("Select urban agglomeration")

const selRegion = (region) => {
  switch (region) {
    case 'jing-jin-ji':
        selUrbanAgglomeration.value = "Jing-Jin-Ji Region"
        break
    case 'chang-san-jiao':
        selUrbanAgglomeration.value = "Chang-San-Jiao Region"
        break
    case 'fen-wei':
        selUrbanAgglomeration.value = "Fen-Wei Plain Region"
        break
    case 'zhu-san-jiao':
        selUrbanAgglomeration.value = "Zhu-San-Jiao Region"
        break
    case 'cheng-yu':
        selUrbanAgglomeration.value = "Cheng-Yu Region"
        break
    default:
        break
  }

  store.commit('setData', {
    field: 'select_group',
    data: region
  })
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
      map.setFilter("points-selected", ["==", "group", ""]);
      if (e.type === 'draw.delete') {
        map.setFilter("points-selected", ["in", "index", ""]);
        // map.setFilter("points-selected", ["==", "group", ""]);
        cityList = []
        store.commit('setData', {
          field: 'select_city',
          data: cityList
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
            memo.push(feature.properties.index);
          }
          return memo;
        }, []);
        pointList = filter
        store.commit('setData', {
          field: 'select_city',
          data: pointList
        })
        map.setFilter("points-selected", ["in", "index", ...filter]);
      } else {
        // answer.innerHTML = '';
      }
    }

onMounted(() => {
    map = new mapboxgl.Map({
        container: 'map-city-container',
        style: 'mapbox://styles/dezhanvis/ckmcv57z60gjd17rq1jvowlcr',
        center: [105.605285,35.404989],
        zoom: 3.0,
        zoomControl: true
      })
    map._logoControl && map.removeControl(map._logoControl);  // 去除mapbox标志
    initDraw()
})

watch (() => stateObj.mapCitiesUpdate, (oldVlaue, newValue) => {
    map.on('load', () => {
        map.addSource("points", {
          "type": "geojson",
          "data": {
            "type": "FeatureCollection",
            "features": stateObj.cityLocs
          }
        })

        map.addLayer({
          "id": "points",
          "type": "circle",   /* symbol类型layer，一般用来绘制点*/
          "source": "points",
          paint: {
            'circle-radius': 4,
            'circle-color': '#fec006'
          }
        });

        map.addLayer({
          "id": "points-selected",
          "type": "circle",
          "source": "points",
          "paint": {
            'circle-radius': 4,
            'circle-color': '#eb6877'
          },
          "filter": ["==", "group", stateObj.selectedGroup]  /* 过滤器，名字为空的数据才显示，也就是默认不使用该layer  */
        });

        map.addLayer({
          "id": "points-focused",
          "type": "circle",
          "source": "points",
          "paint": {
            'circle-radius': 5,
            'circle-color': '#0667a0'
          },
          "filter": ["==", "title", '']  /* 过滤器，名字为空的数据才显示，也就是默认不使用该layer  */
        });

        let popup = new mapboxgl.Popup({
          offsets: [ 0, 0 ],
          closeButton: false,
          background:'#333'
        })
        map.on("mousemove", function(e) {
            let features = map.queryRenderedFeatures(e.point, { layers: ["points"] });/*queryRenderedFeatures  ([geometry], [parameters]):返回满足查询条件并且能够可视化的Geojson特性对象数组，查询条件可以是layers或者filter，如果是layers，则在这些layer之内的特性能够返回  */
            if (features.length) {
                // console.log(features[0].properties.title);
                // console.log(e.point);
                popup
                .setHTML(`<span style="color:'#fff'">${features[0].properties.title}</span>`)
                .setLngLat(features[0].geometry.coordinates)
                .addTo(map)
            } else {
                popup.remove()
            }
        });
    
        // Reset the state-fills-hover layer's filter when the mouse leaves the map
        map.on("mouseout", function() {
            popup.remove()
        });
    })
})

watch (() => stateObj.selectedGroup, (oldVlaue, newValue) => {
    console.log('fffffff');
    map.setFilter("points-selected",["==", "group", stateObj.selectedGroup])
    cityList = cityGroup[stateObj.selectedGroup]
    store.commit('setData', {
    field: 'select_city',
    data: cityList
    })
})

</script>

<style scoped>
@import "https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css";
@import "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.3.0/mapbox-gl-draw.css";

.outer-container {
  width: 420px;
}

.map-city-container {
  /* position: absolute; */
  /* left: 300; */
  margin: 0 auto;
  width: 400px;
  height: 400px;
}

.badge-secondary {
  font-size: 12px !important;
}

.config-title {
  /* font-weight: 600; */
  font-weight: 400;
  text-align: left;
  margin-left: 10px;
  margin-bottom: 3px;
  margin-top: 10px;
  letter-spacing: 0.5px;
  font-family: "Arial";
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.show-space-btn {
  margin-right: 20px;
  font-size: 22px;
  line-height: 20px;
  color: #62a2cb;
}

.show-space-btn:hover {
  cursor: pointer;
}

#Textarea1 {
  width: 270px !important;
  text-align: left !important;
  padding: 1px;
  margin: 0 auto;
  margin-top: 8px;
  font-size: 13px;
}

.sel-focus-city {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 270px;
  margin: 0 auto;
  margin-top: -10px;
  margin-bottom: 7px;
}

.sel-focus-city .dropdown-toggle {
  border-bottom: solid 1px #9c9c9c;
  border-radius: 0;
}

.sub-label {
  font-size: 15px;
}

#focus_city_select {
  width: 160px !important;
  height: 26px;
  font-size: 14px;
  padding-bottom: 0px;
  padding-top: 0px;
  margin-top: -10px;
}

#dropdownMenuButton {
  width: 160px;
  height: 28px;
  font-size: 14px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  justify-content: space-between;
  /* background-color: #6c757d; */
}

.dropdown-menu {
  width: 140px;
}

.dropdown-item {
  padding: 2px 12px !important;
  height: 18px;
  font-size: 12px;
}

.ua-dropdown,
.ua-dropdown .dropdown-toggle,
#dropdown-menu-ua {
  margin: 0 auto;
  width: 270px !important;
}

.ua-dropdown .dropdown-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  font-size: 15px;
  border-bottom: solid 1px #9c9c9c;
  border-radius: 0;
}

.btn-light {
  width: 268px !important;
  /* margin-right: 12px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  /* background-color: #eff0f0; */
  font-size: 14px !important;
  border: solid 1px #fff !important;
  /* border: none; */
}

.hidden {
  display: flex;
}

.form-row {
  width: 270px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  margin-bottom: 5px;
}

.form-control {
  width: 220px;
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

.var-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>