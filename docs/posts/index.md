---
layout: page
title: Archives
---

<script setup>
import { data } from './posts.data.js'
</script>

# Archives

<div v-for="group in data" :key="group.year" class="year-group">
  <h2>{{ group.year }}</h2>
  <ul>
    <li v-for="post in group.items" :key="post.url">
      <a :href="post.url">{{ post.title }}</a>
      <span class="date">{{ post.date.string }}</span>
    </li>
  </ul>
</div>

<style>
.year-group { margin-bottom: 2rem; }
.date { color: var(--vp-c-text-2); font-size: 0.9em; margin-left: 0.5rem; }
</style>
