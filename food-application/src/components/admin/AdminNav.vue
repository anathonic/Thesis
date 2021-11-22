<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
    <div class="container-fluid">
        <button class="btn btn-secondary m-2" id="sidebarToggle">Raport</button>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mt-2 mt-lg-0">
                <li class="nav-item active"><a class="nav-link" href="#!">Strona główna</a></li>
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

</style>