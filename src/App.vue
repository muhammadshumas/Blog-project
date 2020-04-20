<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
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
