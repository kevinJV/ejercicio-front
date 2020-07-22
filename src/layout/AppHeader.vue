<template>
    <header class="header-global">
        <base-nav class="navbar-main" transparent type="" effect="light" expand>
            <router-link slot="brand" class="navbar-brand mr-lg-5" to="/catalog">
                <a href="/catalog" rel="noopener"
                    class="btn btn-primary btn-icon">
                    <span class="nav-link-inner--text">Search product</span>
                </a>
            </router-link>
            
            <ul class="navbar-nav align-items-lg-center ml-lg-auto">        
                <li class="nav-item d-none d-lg-block ml-lg-4">
                    <router-link slot="brand" class="navbar-brand mr-lg-5" to="/login">
                        <a href="/login" rel="noopener"
                            class="btn btn-neutral btn-icon">
                            <span class="nav-link-inner--text">Administrator</span>
                        </a>
                    </router-link>
                </li>
            </ul>
        </base-nav>
    </header>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";

export default {
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown
  }
};
</script>
<style>
</style>
