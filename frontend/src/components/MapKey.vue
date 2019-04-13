<template>
  <div class="columns is-mobile is-centered">
    <div class="column is-vertical-center">
      <img src="../assets/blue-marker.svg">
      <div>EA Sensors</div>
    </div>
    <div class="column is-vertical-center">
      <img src="../assets/purple-marker.svg">
      <div>Local Sensors</div>
    </div>
    <div class="column is-vertical-center">
      <img src="../assets/flood-area.svg">
      <div>Flood Areas</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MapKey"
};
</script>

<style scoped>
.is-vertical-center {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
}
.is-vertical-center * {
  padding: 0.2em;
}
.columns {
  padding: 0 1em;
}
</style>
