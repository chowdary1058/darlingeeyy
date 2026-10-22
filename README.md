# FOREVER US ❤️ — A Cinematic Birthday Surprise For Bangarammm....

> *"Today, the world celebrates you. But my heart celebrates you every single day."*  
> **Exclusively created with love by Sai for Bangarammm.... (whom Sai lovingly calls Maa).**

---

## ✨ Overview

**Forever Us** is an emotionally immersive, cinematic birthday experience crafted with luxury movie title aesthetics, Apple-inspired glassmorphism, and interactive storytelling. 

It takes Bangarammm.... through 10 intimate chapters:
1. **Prologue — A World Just For You**: Atmospheric cinematic intro with floating golden dust, a glowing heart, and gentle narrative reveals.
2. **Secret Password Gate 🔐**: Deep burgundy glassmorphism card with an interactive numeric keypad, affectionate error feedback ("Almost there, Maa! Try our special date again. ❤️"), and a romantic unlocking sequence.
3. **Welcome Screen — My Favorite Person ❤️**: Large portrait frame in champagne-gold and rose glow with sequential emotional greetings.
4. **Interactive Romantic Questions 💗**: 4 interactive questions with playful evasion handling and loving affirmations.
5. **The Cinematic Birthday Reveal 🎂**: Confetti bursts, fireworks, and an interactive birthday cake where she can make a wish and blow out the candles!
6. **The Heartfelt Letter 💌**: Intimate love letter with an animated typewriter reveal, parchment glass styling, and wax seal detail.
7. **Virtual Hug Experience 🤗**: Custom animated romantic chibi couple walking together into an embrace, accompanied by pulsing heartbeat aura and audio.
8. **Under The Same Stars (I Miss You) 🌙**: Midnight starry sky with celestial moon and deep emotional reflections.
9. **Our Memory Scrapbook 📸**: Polaroid-style photo gallery with champagne-gold borders, sticky tape stickers, handwritten captions, and full-screen lightbox previews.
10. **Forever Us Celebration ❤️**: Grand finale with golden confetti cannons, heartfelt closing words from Sai, and a smooth replay button.

---

## 🛠️ Tech Stack

- **React 19 & TypeScript**: Ultra-fast, type-safe interactive components.
- **Vite 6**: Instant hot-module replacement and optimized production builds.
- **Framer Motion**: Smooth 60fps spring transitions and cinematic text reveals.
- **Vanilla CSS (Design System)**: Bespoke glassmorphism, tailored HSL color tokens, and responsive mobile-first styling.
- **HTML5 Canvas Particle Engine**: High-performance floating golden dust, rose petals, soft bokeh orbs, and rising hearts.
- **Web Audio API Engine**: Built-in romantic acoustic piano ambient synthesizer and interactive sound effects (chimes, heartbeats, candle blows).
- **Lucide Icons & Canvas Confetti**: Modern vector icons and celebratory particle bursts.

---

## 🚀 Quick Start (Running Locally)

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```
This produces an optimized production bundle in the `dist/` directory.

---

## 🎨 How to Personalize (Central Configuration)

All names, messages, passwords, photos, and music are centrally managed in:
👉 **`src/config/romanticConfig.ts`**

### 1. Change the Password (Special Date)
In `src/config/romanticConfig.ts`:
```ts
password: {
  code: "1942", // Change to your special date PIN (e.g. "1942" or "1402")
  hint: "Our Special Date (DDMM or MMDD)",
  displayHint: "1942 (Change anytime in src/config/romanticConfig.ts)",
}
```

### 2. Replace Photographs
Replace the files in the `public/images/` folder with your own photos:
- `public/images/portrait-placeholder.jpg` — Her main portrait shown on the Welcome Screen and Birthday Reveal.
- `public/images/photo-1.jpg` to `photo-6.jpg` — Your favorite shared memories shown in the Scrapbook Gallery.

*(If any image file is missing, an elegant placeholder card is automatically shown so the website never looks broken).*

### 3. Change Background Music
- **Built-in Romantic Synthesizer**: By default, the website includes a built-in Web Audio API romantic piano melody that plays anywhere with zero external files or broken links!
- **Custom Song**: Place your MP3 file in `public/music/romantic-music.mp3`. The music player will automatically load your custom song and fall back to the piano melody if needed.

### 4. Edit Personal Love Letter & Messages
Open `src/config/romanticConfig.ts` and customize:
- `welcome.message`
- `loveLetter.paragraphs`
- `romanticQuestions` & responses
- `photoGallery.photos` captions and locations
- `finalCelebration` closing message

---

## 🌐 Deployment Instructions

### Deploy to Vercel (Recommended)
1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your repository.
4. Framework Preset will automatically detect **Vite**.
5. Click **"Deploy"**. Your romantic website will be live in ~30 seconds!

### Deploy to Netlify
1. Connect your repository on [netlify.com](https://netlify.com).
2. Set Build Command: `npm run build`
3. Set Publish Directory: `dist`
4. Click **"Deploy Site"**.

---

## 🔒 Privacy & Safety Note
This website features a playful surprise gate meant for romantic anticipation. It is a client-side gate designed for a fun user experience rather than confidential authentication.

---

**Made with all my love, by Sai for Bangarammm.... (Maa) ❤️**
