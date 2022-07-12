<template>
    <div id="app">
       
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
       
    <router-view />
     
  </div>
</template>

<style>
html,
body {
  height: 100%;
}
body {
  margin: 0;
}
.ivu-table-wrapper{
    margin:20px 0;
}
.icon_t{
    width: 30px;
    height: 18px;
    margin-top:3px;
    margin-left:5px;
}
</style>