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
                            <div class="display-3 mb-0 mt-4 text-center">
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
                        <table class="table table-striped table-ligth">
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
                              <td>{{product.image}}</td>                            
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
              products: []
            };
        },
        methods: {
            search: function(){
                if(this.text == ''){
                  return false
                }
                apiService.getSearchProducts(this.text, this.name, this.description).then(response =>{
                    if(response.status != 200){
                        console.log(response)
                        console.error("There was a error")
                    }else{
                        console.log(response)
                        this.products = response.data.result
                    }
                })
            },
            showAll: function(){
                apiService.getProducts().then(response =>{
                    if(response.status != 200){
                      console.log(response)
                      console.error("There was a error")
                    }else{
                      this.products = response.data
                      console.log(this.products)
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
