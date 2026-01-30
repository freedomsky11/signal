import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'

// Helper to generate sidebar from posts
function getPostsSidebar() {
  const postsDir = path.resolve(__dirname, '../posts')
  
  if (!fs.existsSync(postsDir)) return []

  // Get Years
  const years = fs.readdirSync(postsDir).filter(f => /^\d{4}$/.test(f)).sort().reverse()
  
  const sidebar = years.map(year => {
    const yearDir = path.join(postsDir, year)
    // Get Months
    const months = fs.readdirSync(yearDir).filter(f => /^\d{2}$/.test(f)).sort().reverse()
    
    const items = months.map(month => {
      const monthDir = path.join(yearDir, month)
      const files = fs.readdirSync(monthDir).filter(f => f.endsWith('.md')).sort().reverse()
      
      return {
        text: `${year}-${month}`,
        collapsed: true, // Default collapsed to keep sidebar clean
        items: files.map(file => {
           // Try to extract title, fallback to filename
           const filePath = path.join(monthDir, file)
           const content = fs.readFileSync(filePath, 'utf-8')
           const titleMatch = content.match(/^title:\s*["']?(.*?)["']?$/m)
           const title = titleMatch ? titleMatch[1] : file.replace('.md', '')
           
           return {
             text: title,
             link: `/posts/${year}/${month}/${file}`
           }
        })
      }
    }).flat() // Flatten months into the year group

    return {
      text: `${year} Archive`,
      items: items
    }
  })

  return sidebar
}

export default defineConfig({
  title: "Signal",
  description: "Signal amidst the Noise.",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Archive', link: '/posts/' }
    ],
    sidebar: getPostsSidebar(),
    socialLinks: [
      { icon: 'github', link: 'https://github.com/freedomsky11/signal' }
    ]
  }
})
