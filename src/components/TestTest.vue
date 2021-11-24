<template>
  <section>
    <button @click="changeObj">
      ClickMe
    </button>
    <div>
      {{ person }}
    </div>
  </section>
</template>

<script>
export default {
  data(){
    return{
      person:{}
      
    }
  },
  methods:{
    changeObj(){
      this.person += '-moa'
    }
  }
}
</script>