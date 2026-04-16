const fs = require('fs');
const path = require('path');

const colorMap = {
  'bg-[#F8F6F3]': 'bg-bg',
  'text-[#F8F6F3]': 'text-bg',
  'border-[#F8F6F3]': 'border-bg',
  'bg-[#FFFFFF]': 'bg-panel',
  'text-[#FFFFFF]': 'text-panel',
  'border-[#FFFFFF]': 'border-panel',
  'text-[#2D2A26]': 'text-ink',
  'bg-[#2D2A26]': 'bg-ink',
  'border-[#2D2A26]': 'border-ink',
  'text-[#4A4540]': 'text-ink', // mapping to ink
  'bg-[#4A4540]': 'bg-ink',
  'text-[#8C857D]': 'text-muted',
  'bg-[#8C857D]': 'bg-muted',
  'border-[#8C857D]': 'border-muted',
  'bg-[#E5E0D8]': 'bg-line',
  'border-[#E5E0D8]': 'border-line',
  'text-[#E5E0D8]': 'text-line',
  'text-[#C27A4E]': 'text-red',
  'bg-[#C27A4E]': 'bg-red',
  'border-[#C27A4E]': 'border-red',
  'text-[#D98A59]': 'text-orange',
  'bg-[#D98A59]': 'bg-orange',
  'border-[#D98A59]': 'border-orange',
  'text-[#D9B382]': 'text-yellow',
  'bg-[#D9B382]': 'bg-yellow',
  'border-[#D9B382]': 'border-yellow',
  'text-[#8C9A86]': 'text-green',
  'bg-[#8C9A86]': 'bg-green',
  'border-[#8C9A86]': 'border-green',
  'text-[#8C9A9E]': 'text-blue',
  'bg-[#8C9A9E]': 'bg-blue',
  'border-[#8C9A9E]': 'border-blue',
  // Handle opacity variants
  'bg-[#C27A4E]/10': 'bg-red/10',
  'bg-[#C27A4E]/20': 'bg-red/20',
  'border-[#C27A4E]/20': 'border-red/20',
  'border-[#C27A4E]/30': 'border-red/30',
  'border-[#C27A4E]/50': 'border-red/50',
  'hover:border-[#C27A4E]/60': 'hover:border-red/60',
  'bg-[#D98A59]/10': 'bg-orange/10',
  'border-[#D98A59]/20': 'border-orange/20',
  'border-[#D98A59]/30': 'border-orange/30',
  'bg-[#D9B382]/10': 'bg-yellow/10',
  'border-[#D9B382]/20': 'border-yellow/20',
  'border-[#D9B382]/30': 'border-yellow/30',
  'hover:border-[#D9B382]/60': 'hover:border-yellow/60',
  'bg-[#8C9A86]/5': 'bg-green/5',
  'bg-[#8C9A86]/10': 'bg-green/10',
  'bg-[#8C9A86]/20': 'bg-green/20',
  'border-[#8C9A86]/20': 'border-green/20',
  'border-[#8C9A86]/30': 'border-green/30',
  'border-[#8C9A86]/50': 'border-green/50',
  'hover:border-[#8C9A86]/60': 'hover:border-green/60',
  'bg-[#8C9A9E]/10': 'bg-blue/10',
  'bg-[#8C9A9E]/20': 'bg-blue/20',
  'border-[#8C9A9E]/20': 'border-blue/20',
  'border-[#8C9A9E]/30': 'border-blue/30',
  'border-[#8C9A9E]/50': 'border-blue/50',
  'bg-[#8C857D]/20': 'bg-muted/20',
  'border-[#8C857D]/50': 'border-muted/50',
  'hover:bg-[#F8F6F3]': 'hover:bg-bg',
  'hover:bg-[#E5E0D8]': 'hover:bg-line',
  'hover:bg-[#C27A4E]': 'hover:bg-red',
  'focus:border-[#D98A59]': 'focus:border-orange',
  'focus:border-[#D9B382]/50': 'focus:border-yellow/50',
  'hover:border-[#D98A59]': 'hover:border-orange',
  'hover:bg-[#D9B382]/20': 'hover:bg-yellow/20',
  'text-[#6B655F]': 'text-muted',
  'fill="#C27A4E"': 'fill="var(--theme-red)"',
  'stroke="#E5E0D8"': 'stroke="var(--theme-line)"',
  'stroke="#8C857D"': 'stroke="var(--theme-muted)"',
  "fill: '#8C857D'": "fill: 'var(--theme-muted)'",
};

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;
      
      // Sort keys by length descending to replace longer strings first (e.g. variants with opacity)
      const sortedKeys = Object.keys(colorMap).sort((a, b) => b.length - a.length);
      
      for (const oldColor of sortedKeys) {
        const newColor = colorMap[oldColor];
        if (content.includes(oldColor)) {
          content = content.split(oldColor).join(newColor);
          modified = true;
        }
      }
      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory('./src');
