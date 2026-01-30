import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'

// Helper to map month numbers to names
const monthNames = {
  '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr',
  '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Aug',
  '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec'
}

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
      
      // Convert '01' to 'Jan'
      const monthLabel = monthNames[month] || month

      return {
        text: monthLabel, // <--- Fixed Label
        collapsed: false, // Open by default for better visibility
        items: files.map(file => {
           const filePath = path.join(monthDir, file)
           const content = fs.readFileSync(filePath, 'utf-8')
           const titleMatch = content.match(/^title:\s*["']?(.*?)["']?$/m)
           // If title starts with "Signal Daily", strip it for cleaner sidebar?
           // No, user said "Signal name strange", maybe referring to the top title.
           // Let's keep title as is for now, but ensure it's extracted.
           let title = titleMatch ? titleMatch[1] : file.replace('.md', '')
           
           return {
             text: title,
             link: `/posts/${year}/${month}/${file}`
           }
        })
      }
    }).flat()

    return {
      text: `${year}`,
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
