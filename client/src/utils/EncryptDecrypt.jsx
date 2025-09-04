// shieldCrypto.js
const enc = new TextEncoder();
const dec = new TextDecoder();

function b64(buf) {
  return btoa(String.fromCharCode(...new Uint8Array(buf)));
}
function b64ToArr(b64str) {
  return Uint8Array.from(atob(b64str), (c) => c.charCodeAt(0));
}

async function deriveKey(password, salt) {
  const baseKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000, // strong enough for most apps
      hash: "SHA-256",
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function encrypt(text, password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(password, salt);

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    enc.encode(text)
  );

  return JSON.stringify({
    c: b64(encrypted), // ciphertext
    s: b64(salt.buffer), // salt
    i: b64(iv.buffer), // iv
  });
}

export async function decrypt(payload, password) {
  const obj = JSON.parse(payload);

  const salt = b64ToArr(obj.s);
  const iv = b64ToArr(obj.i);
  const key = await deriveKey(password, salt);

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    b64ToArr(obj.c)
  );

  return dec.decode(decrypted);
}
