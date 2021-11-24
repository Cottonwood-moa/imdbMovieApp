<template>
  <RouterLink
    to="/"
    class="logo">
    <span>OMDbAPI</span>
    .COM
  </RouterLink>
</template>

<style lang="scss" scoped>
    .logo{
      font-family: "Nanum Brush Script", cursive;
      font-size: 30px;
      color: $black;
      text-decoration: none;
      &:hover{
        color: $black;
      }
      span{
        color:$primary;
     
      }
    }
</style>