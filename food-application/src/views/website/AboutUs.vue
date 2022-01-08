<template>
  <div class="aboutus-section">
      <Nav/>
            <div class="row d-flex justify-content-center mt-5">
                <div class="col-md-3 col-sm-6 col-xs-12">
                    <div class="aboutus">
                        <h2 class="aboutus-title">O nas</h2>
                        <p class="aboutus-text"> Jesteśmy z Wami od 10 lat.Początki na rynku sushi były trudne. Dzięki naszej ciężkiej pracy, wielu szkoleniom i Wam, nieustannie się rozwijamy.</p>
                        <p class="aboutus-text">Zawsze dbamy o świeżość składników oraz najwyższą jakość przygotowywanych przez nas potraw.</p>
                        <p class="aboutus-text">Dzięki temu możecie delektować się smakiem i świeżością pysznego sushi oraz serwowanych przez nas przekąsek.</p>
                    <a class="btn btn-outline-dark shadow-sm p-2" href="./contact" role="button">Skontaktuj się z nami</a>
                    </div>
                </div>
                           <div class="col-md-5 col-sm-6 col-xs-12">
                                <div class="feature-content d-flex align-items-center">
                                    <img src="../../../src/assets/mycollection/png/food/food-7.png" style="height:4rem">
                                    <div class="text  m-3">
                                    <h4>Świeże składniki</h4>
                                    <p>Wierzymy, że sushi smakuje najlepiej, gdy przygotowuje się z najwyższej jakości świeżych produktów.</p>
                                    </div>
                                </div>
                                <div class="feature-content d-flex align-items-center">
                                    <img src="../../../src/assets/mycollection/png/others/sushimaster.png" style="height:4rem">
                                    <div class="text  m-3">
                                    <h4>Przygotowanie</h4>
                                    <p>Nasi wyszkoleni sushi-masterzy robią wszystko od podstaw. Codziennie sami ręcznie filetujemy ryby, przygotowujemy ryż, warzywa oraz sosy.</p>
                            </div>
                        </div>
                            <div class="feature-content d-flex align-items-center">
                                    <img src="../../../src/assets/mycollection/png/others/restaurant.png" style="height:4rem">
                                    <div class="text  m-3">
                                    <h4>Przyjazne wnętrze</h4>
                                    <p>Wnętrze lokalu jest spójne, przejrzyste i ciepłe. Zależy nam aby każdy gość czuł się u nas swobodnie i bezpiecznie.</p>
                </div>
            </div>
        </div>
    </div>
       
        <Footer/>
  </div>
</template>

<script>
import Footer from '../../components/website/Footer.vue'
import Nav from '../../components/website/Nav.vue'
export default {
  components: {Nav, Footer},
    name: 'AboutUs'
}
</script>

<style>

</style>