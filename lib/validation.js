const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateAuth({ name, email, password, confirmPassword }, { signup = false } = {}) {
  const errors = {};
  if (signup && !name?.trim()) errors.name = "নাম লিখুন";
  if (!EMAIL_RE.test(email ?? "")) errors.email = "সঠিক ইমেইল লিখুন";
  if ((password ?? "").length < 8) errors.password = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
  if (signup && password !== confirmPassword) errors.confirmPassword = "পাসওয়ার্ড মিলছে না";
  return errors;
}

const AUTH_ERRORS = {
  INVALID_EMAIL_OR_PASSWORD: "ইমেইল বা পাসওয়ার্ড ভুল",
  USER_ALREADY_EXISTS: "এই ইমেইলে আগেই একটি অ্যাকাউন্ট আছে",
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "এই ইমেইলে আগেই একটি অ্যাকাউন্ট আছে",
};

export function authErrorMessage(error) {
  return AUTH_ERRORS[error?.code] ?? error?.message ?? "কিছু একটা ভুল হয়েছে, আবার চেষ্টা করুন";
}

export function safeRedirect(path) {
  return typeof path === "string" && path.startsWith("/") && !path.startsWith("//") ? path : "/";
}
