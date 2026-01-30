---
layout: doc
sidebar: false
---

<script setup>
import { data as posts } from './posts/posts.data.js'
const latest = posts[0]
const recents = posts.slice(1, 10)
</script>

# Signal

<div v-if="latest" class="latest-section">
  <h2>Latest Signal</h2>
  <div class="card">
    <div class="meta">{{ latest.date.string }}</div>
    <h3 style="margin-top: 0.5rem"><a :href="latest.url">{{ latest.title }}</a></h3>
    <p v-if="latest.summary" class="summary">{{ latest.summary }}</p>
    <a :href="latest.url" class="read-more">Read Issue →</a>
  </div>
</div>

## Recent Issues

<ul class="recent-list">
  <li v-for="post in recents" :key="post.url">
    <span class="date">{{ post.date.string }}</span>
    <a :href="post.url">{{ post.title }}</a>
  </li>
</ul>

<div style="margin-top: 2rem">
  <a href="/posts/">View Full Archive →</a>
</div>

<style>
.latest-section { margin-bottom: 3rem; }
.card {
  border: 1px solid var(--vp-c-divider);
  padding: 1.5rem;
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
}
.meta { font-size: 0.9em; color: var(--vp-c-text-2); }
.summary { margin: 1rem 0; color: var(--vp-c-text-1); line-height: 1.6; }
.read-more { font-weight: 500; color: var(--vp-c-brand); }
.recent-list { list-style: none; padding: 0; }
.recent-list li {
  display: flex;
  gap: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--vp-c-divider-light);
}
.recent-list .date {
  color: var(--vp-c-text-3);
  font-family: monospace;
  font-size: 0.9em;
  min-width: 100px;
}
</style>
