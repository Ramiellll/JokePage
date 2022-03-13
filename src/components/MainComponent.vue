<template>
  <HeaderComponent msg="JokePage" />
  <ContentComponent msg="Welcome" />
</template>

<script>
import HeaderComponent from './HeaderComponent.vue'
import ContentComponent from './ContentComponent.vue'
export default {
  name: 'MainComponent',
  components: {
    HeaderComponent,
    ContentComponent
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
