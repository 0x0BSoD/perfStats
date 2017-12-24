<template>
  <v-app>
    <myHeader />
    <v-content>
      <v-container fluid fill-height>
      <router-view></router-view>
      </v-container>
    </v-content>
    <myFooter />
  </v-app>
</template>

<script>
import myHeader from '@/components/global/myHeader'
import myFooter from '@/components/global/myFooter'
export default {
  components: {
    myHeader,
    myFooter
  },
  name: 'app',
  metaInfo: {
    meta: [
      { charset: 'utf-8' },
      { name: 'theme-color', content: '#ffffff' }
    ]
  }
}
</script>

<style lang="scss">
    .biiig {
      width: 100%;
      // height: 100%;
      // position: relative;
    }
    .biiig .Chart__content{
      height: 100%;
      margin: 0 auto;
      // position: absolute;
      // top: 50%;
      // transform: translateY(20%);
    }
</style>
