const baseUrl = import.meta.env.VITE_API_BASE_URL;
const redirectUrl = import.meta.env.VITE_OAUTH2_REDIRECT_URI

export function getSocialLoginUrl(name) {
    console.log("Base URL:", baseUrl);
    console.log("Redirect URL:", redirectUrl);

    return `${baseUrl}/oauth2/authorization/${name}?redirect_uri=${redirectUrl}`;
  };


export const fetchUserDetails =  async () =>  {
  const url = baseUrl + "/api/user";
  const token = localStorage.getItem("jwt");
  const apiResponse = await  fetch(url,{
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  
  const data = await apiResponse.json();

  return data;
}
