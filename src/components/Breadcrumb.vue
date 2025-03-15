<template>
    <nav class="breadcrumb">
      <router-link to="/" class="breadcrumb-link">Trang chủ</router-link> 
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-current">{{ pageTitle }}</span>
    </nav>
  </template>
  
  <script setup>
  defineProps({
    pageTitle: {
      type: String,
      required: true
    }
  });
  </script>
  
  <style scoped>
  .breadcrumb {
    display: inline-flex;
    align-items: center;
    background-color: #ff671b;
    padding: 10px 16px;
    border-radius: 8px;
  }
  
  .breadcrumb-link {
    text-decoration: none;
    color: #fff;
    font-weight: bold;
  }
  
  .breadcrumb-link:hover {
    text-decoration: underline;
  }
  
  .breadcrumb-separator {
    margin: 0 8px;
    color: #fff;
  }
  
  .breadcrumb-current {
    color: #fff;
    font-weight: bold;
  }
  </style>
  