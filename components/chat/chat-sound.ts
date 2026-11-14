/**
 * Soft chime for new replies in the Reen chat. Synthesised with Web Audio (no file to download).
 * Guests can mute it from the chat header; the choice is remembered on this device.
 */

const KEY = "areen-chat-sound";

export function readChatSound(): boolean {
  try {
    return localStorage.getItem(KEY) !== "off";
  } catch {
    return true;
  }
}

export function writeChatSound(on: boolean): void {
  try {
    localStorage.setItem(KEY, on ? "on" : "off");
  } catch {
    /* storage unavailable */
  }
}

let ctx: AudioContext | null = null;

function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  ctx ??= new Ctor();
  return ctx;
}

/** Call from a tap/click (browsers only allow audio after one). */
export function unlockChatSound(): void {
  const c = audio();
  if (c?.state === "suspended") void c.resume();
}

/** "staff": warmer two-note chime for a person from the hotel; "reen": a single light note. */
export function playChatChime(kind: "staff" | "reen" = "reen"): void {
  const c = audio();
  if (!c || c.state !== "running") return; // never forced before the guest has interacted
  const notes: [number, number, number][] =
    kind === "staff"
      ? [[784, 0, 0.22], [1174.7, 0.14, 0.38]]
      : [[1046.5, 0, 0.26]];
  const t0 = c.currentTime + 0.02;
  const master = c.createGain();
  master.gain.value = 0.18;
  master.connect(c.destination);
  for (const [freq, at, dur] of notes) {
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, t0 + at);
    gain.gain.exponentialRampToValueAtTime(1, t0 + at + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + at + dur);
    osc.connect(gain).connect(master);
    osc.start(t0 + at);
    osc.stop(t0 + at + dur + 0.05);
  }
}
