/**
 * AUDIO ENGINE & ROMANTIC AMBIENT SYNTHESIZER
 * Built using Web Audio API + HTML5 Audio fallback.
 * Works seamlessly with zero external assets, plus loads custom MP3 if available.
 */

class RomanticAudioEngine {
  private audioCtx: AudioContext | null = null;
  private bgGainNode: GainNode | null = null;
  private htmlAudio: HTMLAudioElement | null = null;
  private isHtmlAudioPlaying: boolean = false;

  private isMuted: boolean = false;
  private volume: number = 0.6;
  private isPlaying: boolean = false;

  constructor() {
    // Lazy initialized on first user interaction to comply with browser policies
  }

  private initAudioContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public async startMusic(_preferredAudioUrl?: string): Promise<boolean> {
    this.pauseMusic();
    return false;
  }

  public pauseMusic() {
    this.isPlaying = false;
    if (this.htmlAudio && this.isHtmlAudioPlaying) {
      this.htmlAudio.pause();
      this.isHtmlAudioPlaying = false;
    }
    this.stopSynthesizerMelody();
  }

  public async toggleMusic(_preferredAudioUrl?: string): Promise<boolean> {
    this.pauseMusic();
    return false;
  }

  public setMute(mute: boolean) {
    this.isMuted = mute;
    if (this.htmlAudio) {
      this.htmlAudio.muted = mute;
    }
    if (this.bgGainNode && this.audioCtx) {
      this.bgGainNode.gain.setValueAtTime(mute ? 0 : this.volume * 0.15, this.audioCtx.currentTime);
    }
  }

  public toggleMute(): boolean {
    this.setMute(!this.isMuted);
    return this.isMuted;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.htmlAudio) {
      this.htmlAudio.volume = this.isMuted ? 0 : this.volume;
    }
    if (this.bgGainNode && this.audioCtx) {
      this.bgGainNode.gain.setValueAtTime(this.isMuted ? 0 : this.volume * 0.15, this.audioCtx.currentTime);
    }
  }

  public getPlayingState() {
    return {
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
      volume: this.volume,
    };
  }

  private stopSynthesizerMelody() {
    // Background music is disabled
  }

  /* ================== ROMANTIC SOUND EFFECTS ================== */

  public playSoftClick() {
    try {
      this.initAudioContext();
      if (!this.audioCtx || this.isMuted) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const now = this.audioCtx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.06);

      gain.gain.setValueAtTime(0.08 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.07);
    } catch {
      // AudioContext policy safe
    }
  }

  public playChime() {
    try {
      this.initAudioContext();
      if (!this.audioCtx || this.isMuted) return;

      const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      const now = this.audioCtx.currentTime;

      freqs.forEach((freq, i) => {
        if (!this.audioCtx) return;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        const start = now + i * 0.08;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(0.09 * this.volume, start + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 1.2);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(start);
        osc.stop(start + 1.3);
      });
    } catch {
      // Safe
    }
  }

  public playHeartbeat() {
    try {
      this.initAudioContext();
      if (!this.audioCtx || this.isMuted) return;

      const now = this.audioCtx.currentTime;
      [0, 0.22].forEach((offset) => {
        if (!this.audioCtx) return;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        const t = now + offset;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(75, t);
        osc.frequency.exponentialRampToValueAtTime(45, t + 0.14);

        gain.gain.setValueAtTime(0.2 * this.volume, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(t);
        osc.stop(t + 0.15);
      });
    } catch {
      // Safe
    }
  }

  public playMagicUnlock() {
    try {
      this.initAudioContext();
      if (!this.audioCtx || this.isMuted) return;

      const notes = [392.00, 523.25, 659.25, 783.99, 1046.50]; // G4, C5, E5, G5, C6
      const now = this.audioCtx.currentTime;

      notes.forEach((freq, idx) => {
        if (!this.audioCtx) return;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        const start = now + idx * 0.1;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.001, start);
        gain.gain.exponentialRampToValueAtTime(0.12 * this.volume, start + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.8);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(start);
        osc.stop(start + 0.85);
      });
    } catch {
      // Safe
    }
  }

  public playBalloonPop() {
    try {
      this.initAudioContext();
      if (!this.audioCtx || this.isMuted) return;

      const now = this.audioCtx.currentTime;
      // Soft gentle balloon pop sound
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.08);

      gain.gain.setValueAtTime(0.18 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.1);

      // Light sparkle tone
      const sparkle = this.audioCtx.createOscillator();
      const sGain = this.audioCtx.createGain();
      sparkle.type = 'sine';
      sparkle.frequency.setValueAtTime(1174.66, now + 0.02); // D6
      sparkle.frequency.exponentialRampToValueAtTime(1760, now + 0.12); // A6
      sGain.gain.setValueAtTime(0.06 * this.volume, now + 0.02);
      sGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      sparkle.connect(sGain);
      sGain.connect(this.audioCtx.destination);
      sparkle.start(now + 0.02);
      sparkle.stop(now + 0.22);
    } catch {
      // Safe
    }
  }

  public playBlowCandle() {
    try {
      this.initAudioContext();
      if (!this.audioCtx || this.isMuted) return;

      const now = this.audioCtx.currentTime;
      // Soft gentle breath whoosh + chime
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.4);

      gain.gain.setValueAtTime(0.15 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.45);

      setTimeout(() => this.playChime(), 200);
    } catch {
      // Safe
    }
  }
}

export const audioService = new RomanticAudioEngine();
