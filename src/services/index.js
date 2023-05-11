import {
  getPointLocs,
  getCityLocs,
  saveSelData,
  getExistedDataNames,
  trainModel
} from './request'

import { cityGroup } from '@/data'

import { strToJson } from '@/libs/utils'

export default async (store, field, ...args) => {
  let data = null
  switch (field) {
    case 'point_loc':
      data = await getPointLocs(...args)
      break
    case 'city_loc':
      data = await getCityLocs(...args)
      break
    case 'save_sel_data':
      data = await saveSelData(...args)
      break
    case 'existed_data_names':
      data = await getExistedDataNames(...args)
      break
    case 'train_model':
      data = await trainModel(...args)
      break
    default:
      break
  }

  let res = null

  switch (field) {
    case 'point_loc':
      // console.log(data);
      // let jsonData = strToJson(data)
      // 构建为geojson的feature格式
      res = []
      data.forEach((item,index,array)=>{
        let feature = {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [item['lng'], item['lat']]
          },
          "properties": {
            "loc_id": item['loc_id'],
            "province": item['in_province'],
            "city": item['in_city'],
            "natural_region": item['in_natural_region_name1'],
            "natural_sub_region": item['in_natural_region_name2'],
            "natural_zone": item['in_natural_region_name3'],
            "climate_region": item['in_climate_region'],
            "climate_zone": item['in_climate_zone'],
            "vegetation_region": item['in_vegetation_region'],
            "vegetation_zone": item['in_vegetation_zone']
          }
        }
        res.push(feature)
      })

      store.commit('setData', {
        field,
        data: res
      })
      break
    case 'city_loc':
      let jsonData = strToJson(data)
      // 构建为geojson的feature格式
      res = []
      jsonData.forEach((item,index,array)=>{
        let feature = {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [item['lng'], item['lat']]
          },
          "properties": {
            "title": item['name'],
            "group": item['group'],
            "index": item['index']
          }
        }
        // if (item['group'] == "jing-jin-ji") cityGroup["jing-jin-ji"].push(item['name'])
        // if (item['group'] == "chang-san-jiao") cityGroup["chang-san-jiao"].push(item['name'])
        // if (item['group'] == "fen-wei") cityGroup["fen-wei"].push(item['name'])
        // if (item['group'] == "zhu-san-jiao") cityGroup["zhu-san-jiao"].push(item['name'])
        // if (item['group'] == "cheng-yu") cityGroup["cheng-yu"].push(item['name'])
        
        if (item['group'] == "jing-jin-ji") cityGroup["jing-jin-ji"].push(item['index'])
        if (item['group'] == "chang-san-jiao") cityGroup["chang-san-jiao"].push(item['index'])
        if (item['group'] == "fen-wei") cityGroup["fen-wei"].push(item['index'])
        if (item['group'] == "zhu-san-jiao") cityGroup["zhu-san-jiao"].push(item['index'])
        if (item['group'] == "cheng-yu") cityGroup["cheng-yu"].push(item['index'])

        res.push(feature)
      })

      store.commit('setData', {
        field,
        data: res
      })
      break
    case 'train_model':
      res = data
      store.commit('setData', {
        field,
        data: res
      })
      break
    case 'save_sel_data':
      res = data
      store.commit('setData', {
        field: 'existed_data_names',
        data: res
      })
      break
    case 'existed_data_names':
      res = data
      store.commit('setData', {
        field,
        data: res
      })
      break
    default:
      break
  }

  return 0
}