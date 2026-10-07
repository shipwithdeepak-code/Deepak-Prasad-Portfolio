export type VoiceLanguageCode = "en" | "hi" | "kn" | "ta" | "te";

export interface VoiceLanguage {
  code: VoiceLanguageCode;
  label: string;
  nativeName: string;
}

export const VOICE_LANGUAGES: VoiceLanguage[] = [
  { code: "en", label: "English", nativeName: "English" },
  { code: "hi", label: "Hindi", nativeName: "हिन्दी" },
  { code: "kn", label: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "ta", label: "Tamil", nativeName: "தமிழ்" },
  { code: "te", label: "Telugu", nativeName: "తెలుగు" },
];

export interface VoiceErrorDetails {
  code: string;
  isResting: boolean;
  friendlyMessage: string;
}

const PROXY_BASE_URL = "https://dipa-voice-proxy.deepakprasad.workers.dev";

/**
 * Parses any error code or exception from the voice proxy into user-friendly messages.
 * Never exposes raw error codes or technical stack traces to visitors.
 */
export function parseVoiceError(code?: string): VoiceErrorDetails {
  const normalized = (code || "").toLowerCase().trim();

  // 1. Quota / Rate limits -> resting for today
  if (
    normalized === "ip_limit" ||
    normalized === "global_limit" ||
    normalized === "service_out_of_credits"
  ) {
    return {
      code: normalized,
      isResting: true,
      friendlyMessage: "Voice is resting for today. You can still type.",
    };
  }

  // 2. Audio input rejection / size / length
  if (
    normalized === "upstream_rejected_input" ||
    normalized === "audio_too_long" ||
    normalized === "audio_too_large"
  ) {
    return {
      code: normalized,
      isResting: false,
      friendlyMessage: "I couldn't catch that. Please try a shorter question.",
    };
  }

  // 3. origin_not_allowed (e.g. preview), service_busy, service_unavailable, upstream_error, or others
  return {
    code: normalized || "unavailable",
    isResting: false,
    friendlyMessage: "Voice is unavailable right now. You can still type.",
  };
}

/**
 * Speech to Text: upload MediaRecorder blob (max 2 MB and 30 s)
 */
export async function speechToText(
  audioBlob: Blob,
  language: VoiceLanguageCode
): Promise<{ ok: true; transcript: string; language: string }> {
  const formData = new FormData();
  const isMp4 = audioBlob.type.toLowerCase().includes("mp4");
  const fileName = isMp4 ? "rec.m4a" : "rec.webm";
  formData.append("audio", audioBlob, fileName);
  formData.append("language", language);

  let res: Response;
  try {
    // Note: Do not set Content-Type manually; fetch sets multipart boundary automatically
    res = await fetch(`${PROXY_BASE_URL}/stt`, {
      method: "POST",
      body: formData,
    });
  } catch {
    throw parseVoiceError("upstream_unreachable");
  }

  if (!res.ok) {
    let errorCode = "upstream_error";
    try {
      const errJson = await res.json();
      errorCode = errJson?.error?.code || errorCode;
    } catch {
      // ignore
    }
    throw parseVoiceError(errorCode);
  }

  const json = await res.json();
  if (!json.ok) {
    throw parseVoiceError(json.error?.code);
  }

  return json;
}

/**
 * Text Translation: source and target must differ, max 2000 chars
 */
export async function translateText(
  text: string,
  source: VoiceLanguageCode,
  target: VoiceLanguageCode,
  speakerGender?: "male" | "female"
): Promise<{ ok: true; translation: string; source: string; target: string }> {
  if (source === target) {
    return { ok: true, translation: text, source, target };
  }

  const safeText = text.slice(0, 2000);
  const payload: Record<string, string> = {
    text: safeText,
    source,
    target,
  };
  if (speakerGender) {
    payload.speaker_gender = speakerGender;
  }

  let res: Response;
  try {
    res = await fetch(`${PROXY_BASE_URL}/translate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw parseVoiceError("upstream_unreachable");
  }

  if (!res.ok) {
    let errorCode = "upstream_error";
    try {
      const errJson = await res.json();
      errorCode = errJson?.error?.code || errorCode;
    } catch {
      // ignore
    }
    throw parseVoiceError(errorCode);
  }

  const json = await res.json();
  if (!json.ok) {
    throw parseVoiceError(json.error?.code);
  }

  return json;
}

/**
 * Truncates text to complete sentences under 1,400 characters if over 1,500 characters
 */
export function truncateForTTS(text: string): string {
  if (text.length <= 1400) return text;
  // Match sentences ending in punctuation or danda
  const sentences = text.match(/[^.!?।\n]+[.!?।\n]+|\S+$/g) || [text];
  let accumulated = "";
  for (const s of sentences) {
    if ((accumulated + s).length > 1400) {
      break;
    }
    accumulated += s;
  }
  return accumulated.trim() || text.slice(0, 1400);
}

/**
 * Text to Speech: returns binary audio/mpeg (MP3) blob on success
 */
export async function textToSpeech(
  text: string,
  language: VoiceLanguageCode
): Promise<Blob> {
  const safeText = truncateForTTS(text);

  let res: Response;
  try {
    res = await fetch(`${PROXY_BASE_URL}/tts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: safeText,
        language,
      }),
    });
  } catch {
    throw parseVoiceError("upstream_unreachable");
  }

  if (!res.ok) {
    let errorCode = "upstream_error";
    try {
      const errJson = await res.json();
      errorCode = errJson?.error?.code || errorCode;
    } catch {
      // ignore
    }
    throw parseVoiceError(errorCode);
  }

  return await res.blob();
}
