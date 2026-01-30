# Archive

<script setup>
import { data as posts } from './posts.data.js'

// Group by year for cleaner archive view
const grouped = posts.reduce((acc, post) => {
  const y = post.year
  if (!acc[y]) acc[y] = []
  acc[y].push(post)
  return acc
}, {})

const years = Object.keys(grouped).sort().reverse()
</script>

<div v-for="year in years" :key="year" class="year-group">
  <h2 style="border-bottom: 1px solid var(--vp-c-divider); padding-bottom: 0.5rem;">{{ year }}</h2>
  <ul class="archive-list">
    <li v-for="post in grouped[year]" :key="post.url">
      <span class="date">{{ post.date.string.slice(5) }}</span>
      <a :href="post.url">{{ post.title }}</a>
    </li>
  </ul>
</div>

<style>
.archive-list { list-style: none; padding: 0; }
.archive-list li {
  display: flex;
  gap: 1.5rem;
  padding: 0.3rem 0;
}
.archive-list .date {
  color: var(--vp-c-text-3);
  font-family: monospace;
  font-size: 0.9em;
}
</style>
