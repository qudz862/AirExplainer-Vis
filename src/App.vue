<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <!-- <header>
    <div class="wrapper">
        <RouterLink to="/">Data Select</RouterLink>
        &nbsp
        <RouterLink to="/explore">Date Explore</RouterLink>
    </div>
  </header> -->

  <RouterView />
</template>

<style>
body {
  padding: 4px 4px;
}

</style>
