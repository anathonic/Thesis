<template>
         <div class="d-flex" id="wrapper">
        <Sidebar/>
            <div id="page-content-wrapper">
        <Admin-nav/>
                <div class="container-fluid">
                    <h1 class="m-4">Składniki</h1>
<table class="table">
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">Składnik</th>
      <th scope="col">Edytuj</th>
      <th scope="col">Usuń</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Sałata</td>
      <td>Edytuj</td>
      <td>Usuń</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Pomidor</td>
      <td>Edytuj</td>
      <td>Usuń</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Ogórek</td>
      <td>Edytuj</td>
      <td>Usuń</td>
    </tr>
  </tbody>
</table>
                </div>
            </div>
        </div> 
</template>

<script>
import AdminNav from '../../components/admin/AdminNav.vue'
import Sidebar from '../../components/admin/Sidebar.vue'
export default {
  components: { Sidebar, AdminNav },
    name: 'Ingredients'
}
</script>

<style>
#page-content-wrapper {
    width: 100%;
}
</style>