<template>
  <header class="hero-nav">
    <div class="hero-nav__inner">
        <h1 class="title">{{ msg }}</h1>
    </div>
</header>
</template>

<script>
export default {
  name: 'HeaderComponent',
  props: {
    msg: String
  }
}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: "KgHappy";
  src: local("Merienda"),
   url(../fonts/KGHappyFont/KgHappy-wWZZ.ttf) format("truetype");
}
body,html{
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif;
}
.hero-nav{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    height: 140px;
    min-height: 105px;
    background-color: #000;
    background-position: center;
    overflow: hidden;
    h1{
        color: #efefef;
        font-size: 5em;
    }
}
.title{
    font-family: 'KGHappy';
}
</style>
