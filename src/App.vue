<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <v-toolbar :elevation="5" title="Financing Simulator" color="grey">
      <nav>
        <RouterLink to="/investment">Investment simulator</RouterLink>
        <RouterLink to="/immo">Immo</RouterLink>
        <RouterLink to="/comparator">Comparator</RouterLink>
      </nav>
    </v-toolbar>
  </header>

  <div id="body">
    <RouterView />
  </div>
</template>

<style scoped>


nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

#body {
  padding: 30px;
}

</style>
