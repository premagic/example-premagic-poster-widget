<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="app-container">
    <header class="main-header">
      <div class="main-header-inner">
        <router-link to="/register/select" class="main-header-brand">Premagic Demo</router-link>
        <nav class="main-header-nav">
          <router-link
            to="/register/select"
            class="main-header-nav-item"
            :class="{ active: route.path.startsWith('/register') }"
          >
            <span class="main-header-nav-label">Registration</span>
            <span class="main-header-nav-note">LoginWidget + form autofill</span>
          </router-link>
          <router-link
            to="/profile"
            class="main-header-nav-item"
            :class="{ active: route.path === '/profile' }"
          >
            <span class="main-header-nav-label">Profile</span>
            <span class="main-header-nav-note">PosterWidget with prefillData</span>
          </router-link>
        </nav>
      </div>
    </header>
    <router-view />
  </div>
</template>
