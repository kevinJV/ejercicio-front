<template>
    <section class="section section-shaped section-lg my-0" style="height: 100vh;">
        <div class="shape shape-style-1 bg-gradient-default">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="container pt-lg-md">
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <card type="secondary" shadow
                          header-classes="bg-white pb-1"
                          body-classes="px-lg-1 py-lg-1"
                          class="border-0 mb-3">

                          <template>
                            <div class="display-3 mb-0 mt-4 text-center">
                                <small>Logout to test this page availability!</small>
                            </div>
                            <form role="form" @submit.prevent>
                                <div class="text-center">
                                    <button v-on:click="logout()" type="submit" class="btn my-4 btn-danger">Logout</button>
                                </div>
                            </form>
                        </template>
                    </card>

                    <card type="secondary" shadow
                          header-classes="bg-white pb-5"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <template>
                            <div class="display-3 mb-0 mt-4 text-center mb-4">
                                <small>Add a new product to your catalog!</small>
                            </div>
                            <form role="form" @submit.prevent>
                                <input 
                                    v-model="name"
                                    required
                                    placeholder="Name"
                                    class="form-control mb-3">
                                <input 
                                    v-model="description"
                                    required
                                    placeholder="Description"
                                    class="form-control mb-3">
                                <input
                                    required
                                    type="number"
                                    :max="9999999999"
                                    :min="1"
                                    v-model="price"
                                    placeholder="Price"
                                    class="form-control mb-3">
                                <input
                                    required
                                    type="number"
                                    :max="2147483646"
                                    :min="0"
                                    v-model="quantity"
                                    placeholder="Quantity"
                                    class="form-control mb-3">
                                <!-- Got an example from: https://medium.com/js-dojo/how-to-upload-base64-images-in-vue-nodejs-4e89635daebc -->
                                <div class="container mt-12">
                                    <div class="card bg-white">
                                        <img :src="image" style="max-height: 25vh;" alt="">
                                        <input ref="imageFile" @change="handleImage" required class="custom-input" type="file" accept="image/*">
                                    </div>
                                </div>
                                <div class="text-center">
                                    <button v-on:click="createProduct()" type="submit" class="btn my-4 btn-primary">Add product</button>
                                </div>
                            </form>
                            <div class="text-center" v-if="this.warningText != ''">
                                <base-button v-on:click="warningText=''" class="btn-1" outline type="warning">{{this.warningText}}</base-button>
                            </div>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import { APIService } from "../APIService";
    const apiService = new APIService();

    export default {
        name: "Login",
        components: {},
        data() {
            return {
                name: '',
                description: '',
                image: '',
                price: '',
                quantity: '',
                warningText: ''
            };
        },
        methods: {
            handleImage(e) {
                if(e.target.files[0].size > 798576){ //Due to the payload size limit, we should limit how big the image is initially
                    console.error("The image is too big")
                    this.image = ''
                    this.$refs.imageFile.value=null
                    this.warningText = "The image surpasses the size limit"
                    return false
                }
                this.warningText = ''
                const selectedImage = e.target.files[0];
                this.createBase64Image(selectedImage);
            },
            createBase64Image(fileObject) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.image = e.target.result;
                };
                reader.readAsDataURL(fileObject);
            },
            logout: function() { 
                //Due to time I opted a simple method of checking if the user has a Token or not in the localstorage
                //Even if he manages to edit that if the token is not correct, the backend will know it since routes and APIs routes are protected
                localStorage.setItem("token", '');
                this.$router.push('/login');
            },
            createProduct: function(){
                console.log((this.price).length)
                if(this.name == '' || this.description == '' || this.image == '' || this.price == '' || this.price >= 10000000000 || this.quantity >= 2147483647 || this.quantity == ''){
                    this.warningText = 'You have an error on the form'
                    return false;
                }
                apiService.postProducto(localStorage.getItem("token"), this.name, this.description, this.image, this.price, this.quantity).then(response =>{
                    if(response.status != 201){
                        try {
                            this.warningText = response.data[0].message                            
                        } catch (error) {
                            if(response.status == 413){
                                this.warningText = "The image surpased the size limit"
                            }else{
                                this.warningText = "An error occurred"
                                console.log(response)
                            }
                        }
                    }else{
                        this.warningText = "Product added!"
                        this.name = ''
                        this.description = ''
                        this.image = ''
                        this.quantity = ''
                        this.price = ''
                        this.$refs.imageFile.value=null
                    }
                })
            }
        },
        created() {
            console.log('Component has been created!');
        },
        mounted() {},
        beforeRouteEnter(to, from, next) { //Check if he is already loged
            if (localStorage.getItem("token") == '') { //There is a token
                next('/login')
            } else{
                next()
            }
        }
    };
</script>
<style>
</style>
