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
                          header-classes="bg-white pb-5"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">

                        <template>
                            <div class="display-3 mb-0 mt-4 text-center mb-4">
                                <small>Sign in to administrate your products</small>
                            </div>
                            <form role="form" @submit.prevent>
                                <input 
                                        v-model="email"
                                        required
                                        placeholder="Email"
                                        class="form-control mb-3">
                                <input  type="password"
                                        required
                                        v-model="password"
                                        placeholder="Password"
                                        class="form-control">
                                <div class="text-center">
                                    <button v-on:click="login()" type="submit" class="btn my-4 btn-primary">Sign In</button>
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
                email: '',
                password: '',
                warningText: ''
            };
        },
        methods: {
            login: function() { 
                if(this.email != '' && this.password != ''){
                    apiService.postLogin(this.email, this.password).then(response =>{
                        if(response.status != 200){
                            console.error("There was a error")
                            this.warningText = response.data[0].message //While this is a bad practice, due to time constraints I could not do more, wasted enough time in my frontend
                        }else{
                            localStorage.setItem("token", response.data.token);
                            console.log(localStorage.getItem("token"))
                            this.$router.push('/admin')
                        }
                    })
                }
            }
        },
        created() {
            console.log('Component has been created!');
        },
        mounted() {},
        beforeRouteEnter(to, from, next) { //Check if he is already loged
            if (localStorage.getItem("token") != '') { //There is a token
                next('/admin')
            } else{
                next()
            }
        }
    };
</script>
<style>
</style>
