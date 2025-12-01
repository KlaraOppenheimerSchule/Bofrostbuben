<template>
  <h1>Hello App!</h1>
  <p><strong>Current route path:</strong> {{ $route.fullPath }}</p>
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/about">Go to About</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<!-- Instead of using regular <a> tags, we use the custom component RouterLink to create links.

The RouterView component tells Vue Router where to render the current route component.
That's the component that corresponds to the current URL path. 

The example above also uses {{ $route.fullPath }}.
You can use $route in your component templates to access an object that represents the current route.

The view router is created in the router/index.ts file.
The routes array defines the mapping between URL paths and components.

in App.vue the component RouterView is used to display the component that corresponds to the current route.

-->