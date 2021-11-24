<template>
  <Header />
  <RouterView />
  <Footer />
</template>

<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'
export default {
  components:{
    Header,
    Footer
  }
}
</script>
<style lang="scss">
  body{
  font-family: 'Do Hyeon', sans-serif;

  }
</style>