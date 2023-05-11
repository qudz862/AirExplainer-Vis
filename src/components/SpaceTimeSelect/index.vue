<template>
    <PointMapLayer />

    <div>Existed data</div>
    <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Identifier</th>
            <th scope="col">Space</th>
            <th scope="col">Time range</th>
            <th scope="col">Input features</th>
            <th scope="col">Output features</th>
            <th scope="col">Description</th>
            <th scope="col">Added time</th>
            <th scope="col">State</th>
            <th scope="col">operation</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for = "(item,index) in stateObj.existedDataNameList" :value="item">
            <td scope="row" >{{ index+1 }}</td>
            <td class='identifier' :title="item.data_name">{{ item.data_name }}</td>
            <td>{{ item.selSpaceType }}</td>
            <td>{{ item.timeRange.start }}~{{ item.timeRange.end }}</td>
            <td>{{ item.selInputFeaturePoint.air }} {{ item.selInputFeaturePoint.climate }} {{ item.selInputFeaturePoint.space }} {{ item.selInputFeaturePoint.pollution_source }}</td>
            <td>{{ item.selOutputFeaturePoint }}</td>
            <td>{{ item.data_description }}</td>
            <td>{{ item.addedTime }}</td>
            <td>{{ item.state }}</td>
          </tr>
        </tbody>
    </table>
    

    <!-- <div class="existed-data-card" v-for="item in stateObj.existedDataNameList" :value="item">
        <input class="form-control" type="text" :value="item" :title="item">
        <div>Added time: xxxxx</div>
        <div>Description: xxxxxxxxxxx</div>
    </div> -->

    <!-- <select class="form-select" size="3" v-model="sel_data_name">
        <option v-for="item in stateObj.existedDataNameList" :value="item">{{ item }}</option>
    </select> -->
</template>

<script setup>
import PointMapLayer from './PointMapLayer.vue'
// import CityMapLayer from './CityMapLayer.vue'
import { ref, onMounted, computed, watch, markRaw } from "vue"
import { useStore } from 'vuex'
import getData from '@/services'

const store = useStore(),
    state = store.state
const stateObj = computed(() => state).value

// console.log(stateObj.existedDataNameList);


onMounted(() => {
    getData(store, 'existed_data_names')
})

// watch (() => stateObj.existedDataNameList, (oldVal, newVal) => {
//     // existed_data_names.value = [...stateObj.existedDataNameList]
//     console.log(stateObj.existedDataNameList[0]);
// })


watch (() => stateObj.model_train_result, (oldVal, newVal) => {
    console.log(stateObj.model_train_result);
})

</script>

<style scoped>
.existed-data-card {
    width: 400px;
    border: solid 1px #999;
    margin: 5px 5px;
}

.identifier {
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.nav-link {
    cursor: pointer !important;
}

.table {
    max-height: 500px;
    overflow-y: auto;
}
tr {
    height: 32px!important;
}

td {
    height: 32px!important;
}

::-webkit-scrollbar{
  width: 7px;
  height: 7px;
  background-color: #F5F5F5;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #F5F5F5;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb{
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, .1);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .1);
  background-color: #c8c8c8;
}

</style>