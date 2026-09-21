<template>
  <div class="relative">
    <div class="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div class="absolute inset-0 bg-tapestry" />
      <div class="bg-blob -top-24 -left-24 h-72 w-72 bg-brand-300" style="animation-delay: 0s" />
      <div class="bg-blob top-1/3 -right-20 h-80 w-80 bg-pink-300" style="animation-delay: -5s" />
      <div class="bg-blob bottom-0 left-1/4 h-64 w-64 bg-amber-200" style="animation-delay: -9s" />
    </div>

    <ClientOnly>
      <ColorModeToggle class="fixed top-3 right-3 sm:top-4 sm:right-4 z-20" />
    </ClientOnly>

    <NuxtPage />
  </div>
</template>
