<template>
<div id="contact">
  <Nav/>
<div class="container-fluid px-5 my-3">
  <div class="row justify-content-center">
    <div class="col-xl-10 mt-5">
      <div class="card border-0 rounded-3 shadow-lg overflow-hidden">
        <div class="card-body p-0">
          <div class="row g-0">
            <div class="col-sm-6 d-none d-sm-block bg-image" id="googleMap" style="padding: 20px">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2433.4959360188673!2d16.929336115996158!3d52.41581115169757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47045b458e6d37f9%3A0x630f1e648e79b67!2sCollegium%20Da%20Vinci!5e0!3m2!1spl!2spl!4v1645468286870!5m2!1spl!2spl" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>
            <div class="col-sm-6 p-4">
              <div class="text-center">
                <img src="../../../src/assets/mycollection/png/contact/mail-7.png" class="img-fluid mb-2" alt="Responsive image">
                <div class="h3 fw-light">Formularz kontaktowy</div>
                <p class="mb-4 text-muted">Wyślij do nas e-mail!</p>
              </div>

              <form id="contactForm" data-sb-form-api-token="API_TOKEN">

                <div class="form-floating mb-3">
                  <input class="form-control" id="name" type="text" placeholder="Name" data-sb-validations="required" />
                  <label for="name">Imię i nazwisko</label>
                  <div class="invalid-feedback" data-sb-feedback="name:required">Name is required.</div>
                </div>

                <div class="form-floating mb-3">
                  <input class="form-control" id="emailAddress" type="email" placeholder="Email Address" data-sb-validations="required,email" />
                  <label for="emailAddress">E-mail</label>
                  <div class="invalid-feedback" data-sb-feedback="emailAddress:required">Email Address is required.</div>
                  <div class="invalid-feedback" data-sb-feedback="emailAddress:email">Email Address Email is not valid.</div>
                </div>

                <div class="form-floating mb-3">
                  <textarea class="form-control" id="message" type="text" placeholder="Message" style="height: 10rem;" data-sb-validations="required"></textarea>
                  <label for="message">Wiadomość</label>
                  <div class="invalid-feedback" data-sb-feedback="message:required">Message is required.</div>
                </div>

                <div class="d-none" id="submitSuccessMessage">
                  <div class="text-center mb-3">
                    <div class="fw-bolder">Form submission successful!</div>
                    <p>To activate this form, sign up at</p>
                    <a href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                  </div>
                </div>

                <div class="d-none" id="submitErrorMessage">
                  <div class="text-center text-danger mb-3">Error sending message!</div>
                </div>

                <div class="d-grid">
                  <button class="btn btn-light btn-lg shadow-lg" id="submitButton" type="submit">Wyślij</button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
import Nav from '../../components/website/Nav.vue'
export default {
  components: {Nav },
    name: 'Contact'
}
</script>

<style>

</style>