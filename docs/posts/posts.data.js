import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export default {
  watch: ['./**/*.md'],
  load(watchedFiles) {
    const posts = []
    const postsDir = path.resolve(__dirname)
    
    // Safety check for directories
    if (!fs.existsSync(postsDir)) return []

    const years = fs.readdirSync(postsDir).filter(f => /^\d{4}$/.test(f))
    
    for (const year of years) {
      const yearDir = path.join(postsDir, year)
      const months = fs.readdirSync(yearDir).filter(f => /^\d{2}$/.test(f))
      
      for (const month of months) {
        const monthDir = path.join(yearDir, month)
        const files = fs.readdirSync(monthDir).filter(f => f.endsWith('.md'))
        
        for (const file of files) {
           const src = fs.readFileSync(path.join(monthDir, file), 'utf-8')
           const { data } = matter(src)
           const slug = file.replace('.md', '')
           
           // Clean URL: 2026-01-08 -> 08
           const urlSlug = /^\d{4}-\d{2}-\d{2}$/.test(slug) ? slug.slice(8) : slug
           
           posts.push({
             title: data.title || slug,
             url: `/posts/${year}/${month}/${urlSlug}`,
             date: {
                time: +new Date(data.date || `${year}-${month}-01`),
                string: data.date || `${year}-${month}`
             },
             year
           })
        }
      }
    }
    
    posts.sort((a, b) => b.date.time - a.date.time)

    // Group by year
    const grouped = {}
    posts.forEach(p => {
        if(!grouped[p.year]) grouped[p.year] = []
        grouped[p.year].push(p)
    })
    
    return Object.keys(grouped).sort().reverse().map(y => ({
        year: y,
        items: grouped[y]
    }))
  }
}
