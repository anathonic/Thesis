<template>
<nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom">
    <div class="container-fluid">
        <router-link to="/panel">
        <img src="../../../src/assets/mycollection/png/others/menu.png" class="img-fluid" alt="Responsive image">
        </router-link>
         <a class="navbar-brand ms-3" href="/panel">Admin Panel </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mt-4 mt-lg-0">
                <li class="nav-item active"><a class="nav-link" href="./">Strona internetowa</a></li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Konto</a>
                    <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#!">Profil</a>
                        <a class="dropdown-item" href="#!">Ustawienia</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#!">Wyloguj się</a>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</nav>  
</template>

<script>
export default {
    name: 'AdminVue'
}
</script>

<style>
.container-fluid{
font-family: 'DM Sans', sans-serif;
}
.navbar-brand{
 font-weight: bold;
}
</style>