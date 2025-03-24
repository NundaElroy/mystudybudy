const baseUrl = import.meta.env.VITE_API_BASE_URL;
const redirectUrl = import.meta.env.VITE_OAUTH2_REDIRECT_URI

export function getSocialLoginUrl(name) {
    console.log("Base URL:", baseUrl);
    console.log("Redirect URL:", redirectUrl);

    return `${baseUrl}/oauth2/authorization/${name}?redirect_uri=${redirectUrl}`;
  };