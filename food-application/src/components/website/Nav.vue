<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light" id="navbar">
    <div class="container-fluid">
     <router-link to="/">
        <img src="../../../src/assets/mycollection/png/food/food-13.png" class="img-fluid mb-3" alt="Responsive image">
     </router-link> 
      <form class="d-flex m-2 ">
         <a class="btn btn-outline-dark shadow-sm btn-lg ms-3" href="./login" role="button">Zamów online</a>
        </form>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav me-auto mb-3 mt-0 ms-2 mb-md-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="./">Strona główna</a>
          </li>
          <li class="nav-item">
            <a class="nav-link " href="./menu">Menu</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="./aboutus">O nas</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="./contact">Kontakt</a>
          </li>
        </ul>

      </div>
    </div>
  </nav>
</template>


<script>

export default {
    name: 'Nav'

}

</script>

<style>

</style>