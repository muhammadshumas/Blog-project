<template>
  <div id="app">
    <div id="nav text-center  ">
      <router-link to="/">Search</router-link> |
      <router-link to="/createPost">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
textarea{
  resize: none !important;
}
</style>
