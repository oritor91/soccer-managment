<template>
    <v-app>
      <v-app-bar app color="primary" dark>
        <v-toolbar-title>Soccer Management</v-toolbar-title>
      </v-app-bar>
  
      <v-main>
        <v-container>
          <!-- Main content slot -->
          <slot></slot>
        </v-container>
      </v-main>
  
      <v-footer app color="primary" dark>
        <v-col class="text-center">© 2024 Soccer Management</v-col>
      </v-footer>
    </v-app>
  </template>
  
  <script>
  export default {
    name: 'Layout',
  };
  </script>
  