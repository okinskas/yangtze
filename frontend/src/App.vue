<template>
  <div id="app">
    <dashboard/>
  </div>
</template>

<script>
import Dashboard from "./components/Dashboard";

export default {
  name: "app",
  components: {
    Dashboard
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Muli");
</style>

<style>
#app {
  font-family: "Muli", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
h1,
h2 {
  padding: 0;
  margin: 0.2em;
}
</style>