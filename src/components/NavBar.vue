<template>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Soccer Management</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/">Players</v-btn>
      <v-btn text to="/games">Games</v-btn>
    </v-app-bar>
  </template>
  
  <script>
  export default {
    name: 'NavBar',
  };
  </script>
  