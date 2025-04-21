<template>
  <div>
    <div class="min-h-screen bg-gray-100 flex justify-center items-center">
      <h1 class="text-4xl font-bold text-blue-500">Welcome to the Dashboard {{ avatar.name }}</h1>
    </div>
  </div>
</template>

<script lang="ts" setup>

const avatar = await useAvatar();

</script>
