/**
 * CENTRAL PERSONALIZATION CONFIGURATION
 * FOREVER US ❤️ — A CINEMATIC BIRTHDAY SURPRISE
 * 
 * IMPORTANT PERSONALIZATION RULES:
 * - Partner: Bangarammm....
 * - Affectionate Nickname: Maa
 * - Creator: Sai
 * - Note: The affectionate nickname is strictly "Maa" throughout the entire website.
 * 
 * All details here can be easily edited or customized by Sai.
 */

export interface RomanticConfig {
  yourName: string;
  partnerName: string;
  nickname: string;
  occasion: string;
  password: {
    code: string;
    hint: string;
    displayHint: string;
    photoUrl?: string;
  };
  welcome: {
    photoUrl: string;
    heading: string;
    subheading: string;
    message: string;
    ctaButton: string;
  };
  birthdayReveal: {
    mainHeading: string;
    partnerTitle: string;
    dedication: string;
    emotionalMessage: string;
    photoUrl: string;
    ctaButton: string;
  };
  loveLetter: {
    heading: string;
    greeting: string;
    paragraphs: string[];
    signOff: string;
    sender: string;
    ctaButton: string;
    eyesPortrait: {
      url: string;
      badge: string;
      title: string;
      quote: string;
      subQuote: string;
      dedication: string;
    };
  };
  virtualHug: {
    heading: string;
    lines: string[];
    actionPrompt: string;
    embracedMessage: string;
    ctaButton: string;
  };
  missYou: {
    heading: string;
    lines: string[];
    finalLine: string;
    ctaButton: string;
  };
  romanticQuestions: Array<{
    id: number;
    question: string;
    yesText: string;
    noText: string;
    yesResponse: string;
    noResponse: string;
  }>;
  photoGallery: {
    title: string;
    subtitle: string;
    photos: Array<{
      id: number;
      url: string;
      caption: string;
      date?: string;
      location?: string;
      emoji?: string;
    }>;
    ctaButton: string;
  };
  finalCelebration: {
    partnerName: string;
    lines: string[];
    wishes: string;
    signOff: string;
    sender: string;
    celebrationText: string;
    replayButton: string;
  };
  music: {
    audioPath: string;
    title: string;
    artist: string;
    autoPlayPrompt: string;
  };
}

export const romanticConfig: RomanticConfig = {
  yourName: "Sai",
  partnerName: "Bangarammm....",
  nickname: "Maa",
  occasion: "Birthday surprise",

  // Playful password gate: Sai can replace '1942' with their actual anniversary or special date!
  // Note: This is an emotional, playful gate for the romantic journey.
  password: {
    code: "1942",
    hint: "Our Special Date (DDMM or MMDD)",
    displayHint: "1942 (Change anytime in src/config/romanticConfig.ts)",
    photoUrl: "/images/secret-lock.jpg",
  },

  welcome: {
    photoUrl: "/images/look-whos-she.jpg",
    heading: "Look who she is... 🥹❤️",
    subheading: "Welcome to your little surprise, Bangarammm....",
    message: "Today, the world celebrates you. But my heart celebrates you every single day.",
    ctaButton: "Let's Begin, Maa 💖",
  },

  romanticQuestions: [
    {
      id: 1,
      question: "Maa, do you know how much you are special to me?",
      yesText: "YES ❤️",
      noText: "NO 🙈",
      yesResponse: "As vast and infinite as this entire universe... that's how special you are to me, Maa. You are my whole universe! 🌌✨",
      noResponse: "Hehe, look at this vast universe, Bangarammm... 🥹 That's how infinitely special you are to me! You are my whole universe! 🌌❤️",
    },
    {
      id: 2,
      question: "Can you guess who makes my world more beautiful?",
      yesText: "YES 💖",
      noText: "NO 🥹",
      yesResponse: "You make even the simplest moments feel magical. 💗",
      noResponse: "Aww Maa, it's YOU! Always has been, always will be. ✨",
    },
    {
      id: 3,
      question: "If I could choose one person to make memories with, would you let me choose you again and again?",
      yesText: "YES, ALWAYS ❤️",
      noText: "NO 🙈",
      yesResponse: "Forever and ever, Maa. In every lifetime! 💍",
      noResponse: "There's no escape from my love, Bangarammm! 😜❤️",
    },
    {
      id: 4,
      question: "One last question, Bangarammm.... Are you ready for your birthday surprise?",
      yesText: "YES, SHOW ME! 🎁",
      noText: "NOT YET 🙈",
      yesResponse: "Hold your breath, Maa... Here it comes! ✨🎂",
      noResponse: "Ready or not, my love for you is ready to celebrate! 💖",
    },
  ],

  birthdayReveal: {
    mainHeading: "HAPPY BIRTHDAY",
    partnerTitle: "MY BANGARAMMM.... ❤️",
    dedication: "To the girl I lovingly call Maa...",
    emotionalMessage: "Today is your day, and I wish I could make every second of it as beautiful as the happiness you bring into my life.",
    photoUrl: "/images/happy-birthday-bangaram.jpg",
    ctaButton: "There's Something I Want to Tell You 💌",
  },

  loveLetter: {
    heading: "A Letter From My Heart",
    greeting: "Dear Maa, ❤️",
    paragraphs: [
      "Happy Birthday dear Bangaram my one of the best person in my entire life ,u have stayed my side when I'm in low condition 😔,even every one is opposite of my side u stayed my side and u keep supporting to me .... And u have never ignored me .... Even IM NOT A GOOD PERSON IN UR LIFE, BUT  U NEVER LEAVE ME ALONE ....❤️🩹 , even I hurt u ,, u will not move on  from meh ..... Nenu call chayakapoina ,msg chayaka poina nuve chasatav akada ardam avthadi nuv Naku ichina priority..... SORRY MA NINU CHALA  BADHA PETA .....🥺 , ee roju nunchi asalu em repeat chayanu ninu baga chusukunta anukuntuna maa",
      "And chapali ante nak first love nuvey maa nijam gaa inka evarini nen love chai lee and I'm so lucky to have u in my life",
      "And once again happy b'day to my beautiful bangaram ❣️ (bharyamani)",
    ],
    signOff: "With all my love,",
    sender: "Sai ❤️",
    ctaButton: "Hugging 🤗",
    eyesPortrait: {
      url: "/images/eyes-portrait.jpg",
      badge: "Cinematic Slow-Motion",
      title: "Those Eyes That Hold My Universe ✨",
      quote: "In your eyes, I found a universe I never want to leave. Even time slows down whenever you look at me...",
      subQuote: "They say eyes speak what words can never say. Every gentle glance of yours feels like home, Bangarammm.",
      dedication: "Forever captivated by your gaze, Maa ❤️",
    },
  },

  virtualHug: {
    heading: "A Warm Hug Across the Distance",
    lines: [
      "If I were there right now...",
      "I'd hold you close, wish you the happiest birthday, and remind you how much you mean to me.",
      "Until I can give you that hug in person, here's a little piece of my heart. ❤️",
    ],
    actionPrompt: "Hugging 🤗",
    embracedMessage: "Hugging you tightly right now in spirit, Maa... ❤️",
    ctaButton: "One More Little Surprise 💗",
  },

  missYou: {
    heading: "Under the Same Starlit Sky",
    lines: [
      "Sometimes, all I want...",
      "...is to be right there beside you, Maa.",
      "I wish I could see your smile, hear your laugh, and make this birthday even more special for you.",
    ],
    finalLine: "Until then, let this little surprise remind you that you are loved. ❤️",
    ctaButton: "Let's Remember Our Moments 📸",
  },

  photoGallery: {
    title: "Our Moments & Memories 📸",
    subtitle: "A digital scrapbook of warmth, laughter, and treasured smiles.",
    photos: [
      {
        id: 1,
        url: "/images/memory-1-shadow.jpg",
        caption: "Shadows on the sand — walking beside you forever. ❤️",
        date: "Our Beach Walk",
        location: "Beach Shore",
        emoji: "😘",
      },
      {
        id: 2,
        url: "/images/memory-2-waves.jpg",
        caption: "Tasting the ocean waves together, hand in hand. 🌊",
        date: "Ocean Whispers",
        location: "Seaside Shore",
        emoji: "😍",
      },
      {
        id: 3,
        url: "/images/memory-3-vintage-love.jpg",
        caption: "Our cozy vintage world — always better together. 🕯️📻",
        date: "1980 Vintage Tale",
        location: "Good People Better Together",
        emoji: "🤌🏻",
      },
      {
        id: 4,
        url: "/images/memory-4-beach-lift.jpg",
        caption: "Holding you in my arms by the sea — my happiest place. 🌊❤️",
        date: "Pure Joy & Embrace",
        location: "Under the Sun",
        emoji: "💗",
      },
      {
        id: 5,
        url: "/images/memory-5-royal-krishna.jpg",
        caption: "My Radha, my world, my forever Bangarammm.... 👑🪈✨",
        date: "Divine Elegance",
        location: "Sai & Maa ❤️",
        emoji: "💫",
      },
      {
        id: 6,
        url: "/images/memory-6-beach-selfie.jpg",
        caption: "That gorgeous smile of yours that lights up my entire world. 📸❤️",
        date: "Favorite Smiles",
        location: "Beachside Fun",
        emoji: "💘",
      },
    ],
    ctaButton: "To Our Forever ❤️",
  },

  finalCelebration: {
    partnerName: "Bangarammm.... ❤️",
    lines: [
      "Of all the little things life gives us, I'm grateful for the moments that bring you into my world.",
      "Today, tomorrow, and on every birthday to come, I hope life gives you countless reasons to smile.",
    ],
    wishes: "Happy Birthday, Maa. ❤️",
    signOff: "With love, always...",
    sender: "— Sai",
    celebrationText: "FOREVER US ❤️",
    replayButton: "Replay Our Little Story ↻",
  },

  music: {
    audioPath: "/music/romantic-music.mp3",
    title: "Forever Us — Piano Melody",
    artist: "Sai for Maa",
    autoPlayPrompt: "Tap to immerse in our romantic melody 🎵",
  },
};
