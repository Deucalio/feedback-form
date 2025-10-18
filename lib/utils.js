export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function sanitizeString(str) {
  if (!str) return null;
  return str.trim();
}

export function getClientIP(request) {
  // Check headers in order of preference
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(",")[0].trim();
  }

  // Try other common headers
  const ip =
    request.headers.get("x-real-ip") ||
    request.headers.get("x-client-ip") ||
    request.headers.get("cf-connecting-ip") || // Cloudflare
    request.headers.get("true-client-ip") || // Cloudflare
    request.headers.get("x-originating-ip") ||
    request.headers.get("x-forwarded-proto") ||
    "unknown";

  return ip;
}