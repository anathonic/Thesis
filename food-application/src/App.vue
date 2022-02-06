<template>
   <router-view></router-view>
</template>

<script>



export default {
  name: 'App',
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans&family=Roboto&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Cuprum:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Cuprum:wght@500&family=DM+Sans:wght@500&display=swap');

*{
font-family: 'DM Sans', sans-serif;
}
.container {
    margin-top: 130px;
    display: flex;
    justify-content: center;
}
div#box{
    background-color: rgb(248,249,250); 
    border-radius: 50px;
    padding: 20px;

}

h3 {
    text-align: center;
}
</style>
