<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
html {
  height: 100%;
}

body {
  padding: 0;
  margin: 0;
  height: 100%;

  display: flex;
  align-items: center;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000;

  width: 100%;
  height: 100%;

  max-width: 1000px;
  max-height: 600px;

  margin: 0 auto;
  border: 1px solid gray;
}
</style>
