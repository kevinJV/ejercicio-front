<template>
    <section class="section-hero section-shaped my-0">
        <!-- SEARCH SECTION       -->
        <div class="shape shape-style-1 shape-primary">
            <span class="span-150"></span>
            <span class="span-50"></span>
            <span class="span-50"></span>
            <span class="span-75"></span>
            <span class="span-100"></span>
            <span class="span-75"></span>
            <span class="span-50"></span>
            <span class="span-100"></span>
            <span class="span-50"></span>
            <span class="span-100"></span>
        </div>
        <!-- <div class="container shape-container d-flex align-items-center"> -->
        <div class="container shape-container d-flex " style="overflow: auto;">
          <div class="container pt-lg-md" style="overflow: auto;">
            <div class="row justify-content-center" style="">
                <div class="col-lg-12" style="">
                    <card type="secondary" shadow
                          header-classes="bg-white pb-1"
                          body-classes="px-lg-1 py-lg-1"
                          class="border-0 mb-3">
                          <template>
                            <div class="text-center mt-4" v-if="this.warningText != ''">
                                <base-button v-on:click="warningText=''" class="btn-1" outline type="warning">{{this.warningText}}</base-button>
                            </div>
                            <div class="display-3 mb-0 mt-2 text-center">
                                <small>Search products</small>
                                <button v-on:click="showAll()" class="ml-3 btn my-4 btn-warning">show all</button>
                            </div>
                            <form role="form" @submit.prevent>
                                <div class="text-center">
                                  <form role="form" @submit.prevent>
                                  <div class="row">                                      
                                      <div class="ml-4 col-lg-6 col-sm-4">
                                        <input 
                                        v-model="text"
                                        required
                                        placeholder="Search text"
                                        class="form-control my-4">
                                        <div class="align-items-center">
                                          <p>Items found: {{this.products.length}}</p>
                                        </div>
                                      </div>
                                      <div class="col-lg-2 col-sm-2">
                                        <input
                                        type="checkbox" 
                                        v-model="name"                                        
                                        placeholder="Search text"
                                        class="form-control my-4">
                                        <div class="align-items-center">
                                          <p>Use name</p>
                                        </div>
                                      </div>
                                      <div class="col-lg-2 col-sm-2">
                                        <input
                                        type="checkbox" 
                                        v-model="description"                                      
                                        placeholder="Search text"
                                        class="form-control my-4">
                                        <div class="align-items-center">
                                          <p>Use description</p>
                                        </div>
                                      </div>
                                      <div class="col-lg-1 col-sm-1">
                                        <button v-on:click="search()" type="submit" class="btn my-4 btn-primary">Search</button>
                                      </div>
                                  </div>
                                  </form>
                                </div>
                            </form>
                          </template>
                      <div class="">                            
                        <table class="table table-striped table-ligth" style="border-collapse:collapse; table-layout:fixed; ">
                          <thead>
                            <tr>
                              <th scope="col">Name</th>
                              <th scope="col">Description</th>
                              <th scope="col">Price</th>
                              <th scope="col">Quantity</th>
                              <th scope="col">Image</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="product in products" :key="product.id">          
                              <td>{{product.name}}</td>
                              <td>{{product.description}}</td>                            
                              <td>{{product.price}}</td>                            
                              <td>{{product.quantity}}</td>                            
                              <td><div class="container mt-12">
                                    <div class="card bg-white">
                                        <img :src="product.image" style="max-height: 12vh; max-width: 35vh;" alt="">
                                    </div>
                                </div></td>                            
                            </tr>         
                          </tbody> 
                        </table>
                      </div>
                    </card>
                </div>
            </div>
          </div>
        </div>

        <!-- PRODUCTS SECTION -->
        
    </section>
</template>

<script>
    import { APIService } from "../APIService";
    const apiService = new APIService();

    export default {
        name: "catalog",
        components: {},
        data() {
            return {
              text: '',
              name: true,
              description: false,
              products: [],
              warningText: ''
            };
        },
        methods: {
            search: function(){
                if(this.text == ''){
                  return false
                }
                this.warningText = "Loading..."
                apiService.getSearchProducts(this.text, this.name, this.description).then(response =>{
                    if(response.status != 200){
                        this.warningText = "Sorry and error ocurred"
                        console.log(response)
                        console.error("There was a error")
                    }else{
                        this.warningText = "Done!"
                        this.products = response.data.result
                    }
                })
            },
            showAll: function(){
                this.warningText = "Loading..."
                apiService.getProducts().then(response =>{
                    if(response.status != 200){
                      this.warningText = "Sorry and error ocurred"
                      console.log(response)
                      console.error("There was a error")
                    }else{
                      this.products = response.data
                      this.warningText = "Done!"
                    }
                })
            }
        },
        watch: {
          name: function(val){
            if(this.description == false && this.name == false){
              this.description = true
            }
          },
          description: function(val){
            if(this.description == false && this.name == false){
              this.name = true
            }
          },
        },
        created() {
            console.log('Component has been created!');
            this.showAll()
        },
        mounted() {}
    };
</script>
