<template>
<div id="payments">
    <div class="grid-container mt-5" id="dashstyle">
        <div class="row payments-row">
            <p class="h3">Dziękujemy za złożenie zamówienia :)</p>
            <p class="h6">Wybierz metodę płatności w celu sfinalizowania transakcji.</p>
        </div>
        <div class="row payments-row">
        <div class="col-md-2 payments-col" @click="pay()">
            <img src="../../../src/assets/mycollection/png/payment/przelewy24.png" class="img-fluid" alt="Responsive image">
            <div class="text-center">
            <p>Przelewy24</p>
            </div>
            </div>
        <div class="col-md-2 payments-col" @click="pay()">
            <img src="../../../src/assets/mycollection/png/payment/paypal.jpg" class="img-fluid" alt="Responsive image">   
            <div class="text-center">
            <p>PayPal</p>
            </div>
        </div>
            <div class="col-md-2 payments-col" @click="pay()">
            <img src="../../../src/assets/mycollection/png/payment/blik.png" class="img-fluid" alt="Responsive image">
        <div class="text-center">
            <p>Blik</p>
            </div>
        </div>
</div>
</div>
</div>
</template>

<script>
export default {
components: { },
  name: 'Payments',
  data(){
    return{}
  },
  methods: {
  pay(){
      sessionStorage.clear()
      this.$router.push('/');
  },
  imgPush() {
    return this.$router.push('/');
  }
  },
}
</script>

<style>
#payments{
    margin-top: 10vw;
}
.row.payments-row{
    display: flex;
    justify-content: center;
    text-align: center;
    margin-bottom: 60px;
}
.col-md-2.payments-col{
    font-family: 'DM Sans', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-style: solid;
    border-width: 2px;
    border-color: #222222;
    flex: 0 0 25%;
    border-radius: 14px;
    margin: 3vw;
    color: black;
    width: 20%!important;
    max-width: 50%;
    cursor: pointer;
    filter: opacity(50%);
}
@media only screen and (max-width: 700px) {
  .col-md-2.payments-col{
    flex: 0 0 80%;
  }
}
.col-md-2.payments-col:hover{
    filter: opacity(100%);
}
.col-md-2.payments-col img{
    padding: 1vw;
    margin: 20px;
    max-width: 100%;
    max-height: 200px;
}
</style>