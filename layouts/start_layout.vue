<template>
  <v-app app dark>
    <v-content>
      <!-- https://stackoverflow.com/questions/52343526/center-content-vertically-on-vuetify
      For horizontal alignment. But it was not working perfectly -->
      <!-- <v-container fill-height fluid>
        <v-row align="center" justify="center">
          <v-col> <nuxt /></v-col>
        </v-row>
      </v-container> -->
      <v-container  fill-height grid-list-xs text-xs-center>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>
