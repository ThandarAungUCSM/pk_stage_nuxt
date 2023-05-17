<template>
  <div>
    <!-- @checkAuth="checkAuth" -->
    <!-- page="prodDetail" // sidebar bugs -->
    <Header />
    <div class="content-css">
      
    </div>

    <Footer page="front" />
  </div>
</template>

<script>
import "element-ui/lib/theme-chalk/index.css"; 
export default {
  name: 'IndexPage',
  data() {
    return {
      userLogin: false
    }
  },
  computed: {
  },
  methods: {
    checkAuth(auth) {
      this.userLogin = auth
    }
  }
}
</script>

<style lang="scss">

</style>
<style lang="scss" scoped>

</style>
