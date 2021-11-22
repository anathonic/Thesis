<template>
<section id="mainpage">
<Nav/>
    <div class="col ms-0 mt-5">
      <div class="hov-img d-flex justify-content-center flex-column">
        <img id="img" src="../../../src/assets/mycollection/jpeg/photo-19.jpeg" alt="" class="">
        <div class="dot-section">
          <span class="dot"></span>
          <span class="smaller-dot"></span>
        <div class="text-center centered">SUSHI RESTAURANT</div>
        </div>
      </div>
    </div> 
      <div class="container-fluid text-center">
        <h1 class="container-h1 mt-5 mb-5">W naszej ofercie znajdziesz:</h1>
          <div class="row">
            <div class="col-sm-4 text-center">
              <img src="../../../src/assets/mycollection/png/food/food-7.png" class="img-fluid" alt="Responsive image">
                <h4 class="top3-title mt-5">Sushi</h4>
                <p>Sushi to nasza pasja. W naszej karcie znajdziecie mnóstwo ciekawych zestawów w szalonych kombinacjach.</p>
                </div>
                <div class="col-sm-4 text-center round">
                  <div class="service-round wedding">
                  <i class="fa fa-4x fa fa-heart sr-icons"></i>
                  </div>
                  <img src="../../../src/assets/mycollection/png/food/food-13.png" class="img-fluid" alt="Responsive image">   
                  <h4 class="top3-title mt-5">Ramen</h4>
                  <p>Słynna zupa japońska składające się z bulionu, makaronu i dodatków. Posiadamy ją w 5 róznych odsłonach. Takze w opcji wegańskiej.</p>
                </div>
                <div class="col-sm-4 text-center round">
                    <div class="service-round b-dinner">
                        <i class="fa fa-4x fa fa-suitcase  sr-icons"></i>
                    </div>
                    <img src="../../../src/assets/mycollection/png/others/green-tea.png" class="img-fluid" alt="Responsive image">
                    <h4 class="top3-title mt-5">Japońskie napoje</h4>
                    <p>W naszej ofercie znajdziesz napoje takie jak matcha, bubble tea, kombucha oraz szeroki wachlarz zielonych herbat!</p>
                </div>
            </div>
            </div>
         <div class="container-fluid text-center">
            <img src="../../../src/assets/mycollection/png/others/laptop.png" class="img-fluid mb-2 mt-5" alt="Responsive image">
        <h1 class="container-h1 mb-5">Serwis online</h1>
          <div class="column d-flex justify-content-center">
            <div class="col-sm-4 text-center">
              <img src="../../../src/assets/mycollection/png/others/next.png" class="img-fluid" alt="Responsive image">
                </div>
                <div class="col-sm-4 text-center round">
                  <div class="service-round wedding">
                  <i class="fa fa-4x fa fa-heart sr-icons"></i>
                  </div>
                      <a class="btn btn-outline-dark shadow-sm btn-lg m-2" href="./login" role="button">Zamów online</a>
                </div>
                <div class="col-sm-4 text-center round">
                    <div class="service-round b-dinner">
                        <i class="fa fa-4x fa fa-suitcase  sr-icons"></i>
                    </div>
                    <img src="../../../src/assets/mycollection/png/others/next.png" class="img-fluid" alt="Responsive image" style="transform: rotate(180deg)">
                </div>
            </div>
            </div> 
            <Footer/>
    </section> 
</template>

<script>
import Footer from '../../components/website/Footer.vue'
import Nav from '../../components/website/Nav.vue'
export default {
  components: { Footer, Nav },
    name: 'MainPage'
}
</script>

<style>
#img{
  display: flex;
  width: 100%;

}

.smaller-dot {
  display: flex;
  width: 20vw;
  height: 20vw;
  background-color: rgb(154,33,17);
  border-radius: 50%;
  position: absolute;
  border-color: rgb(0,22,41);
  top: 45vw;
  left: 50vw;
  transform: translate(-50%, -50%);   
}
.dot{
  display: flex;
  width: 40vw;
  height: 40vw;
  border-radius: 50%;
  position: absolute;
  border-style:double;
  border-color: rgb(0,22,41);
  border-width: 2vw;
  top: 45vw;
  left: 50vw;
  transform: translate(-50%, -50%); 
}
.centered {
  padding-left: 5vw;
  padding-right: 5vw;
  display: flex;
  font-family: 'Cuprum', sans-serif;
  font-size: 5vw;
  border-width: 0.7vw;
  border-style: solid;
  border-color: rgb(0,22,41);
  color: rgb(248,249,250);
  position: absolute;
  top: 45vw;
  left: 50vw;
  transform: translate(-50%, -50%);
}

</style>