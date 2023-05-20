<template>
    <div class="q-pa-md">
    <q-layout view="lHh lpr lFf">
      <MyHeader />

        <q-page-container>
            <router-view />
        </q-page-container>

      <MyFooter />
    </q-layout>
  </div>
</template>

<script setup lang="ts">
import MyHeader from 'components/navigation/header/MyHeader.vue'
import MyFooter from 'components/navigation/footer/MyFooter.vue'
 
</script>
