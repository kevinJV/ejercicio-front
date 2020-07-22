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
                                    v-model="image"
                                    required
                                    placeholder="Image"
                                    value="happy.jpg"
                                    hidden
                                    class="form-control mb-3">
                                <input
                                    required
                                    type="number"
                                    v-model="price"
                                    placeholder="Price"
                                    class="form-control mb-3">
                                <input
                                    required
                                    type="number"
                                    v-model="quantity"
                                    placeholder="Quantity"
                                    class="form-control mb-3">
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
                image: 'happy.jpg',
                price: '',
                quantity: '',
                warningText: ''
            };
        },
        methods: {
            logout: function() { 
                //Due to time I opted a simple method of checking if the user has a Token or not in the localstorage
                //Even if he manages to edit that if the token is not correct, the backend will know it since routes and APIs routes are protected
                localStorage.setItem("token", '');
                this.$router.push('/login');
            },
            createProduct: function(){
                if(this.name == '' || this.description == '' || this.image == '' || this.price == '' || this.quantity == ''){
                    this.warningText = 'Missing necesary data to create a product'
                    return false;
                }
                apiService.postProducto(localStorage.getItem("token"), this.name, this.description, this.image, this.price, this.quantity).then(response =>{
                    if(response.status != 201){
                        console.log(response)
                        console.error("There was a error")
                    }else{
                        console.log(response)
                        this.warningText = "Product added!"
                        this.name = ''
                        this.description = ''
                        this.image = ''
                        this.quantity = ''
                        this.price = ''
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
                next('/catalog')
            } else{
                next()
            }
        }
    };
</script>
<style>
</style>
