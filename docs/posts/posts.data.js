import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export default {
  watch: ['./**/*.md'],
  load(watchedFiles) {
    const posts = []
    const postsDir = path.resolve(__dirname)
    
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
           
           // Format date nicely: YYYY-MM-DD
           let dateStr = data.date 
           if (dateStr instanceof Date) {
              dateStr = dateStr.toISOString().split('T')[0]
           } else if (!dateStr) {
              dateStr = `${year}-${month}-01` // Fallback
           }

           posts.push({
             title: data.title || slug,
             url: `/posts/${year}/${month}/${slug}`, // Robust URL
             date: {
                time: +new Date(dateStr),
                string: dateStr
             },
             summary: data.summary || '',
             year
           })
        }
      }
    }
    
    // Sort by date desc
    posts.sort((a, b) => b.date.time - a.date.time)

    return posts
  }
}
