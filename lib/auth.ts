import * as jwt from "jsonwebtoken";
import { cookies } from 'next/headers';
import { Data } from "./queries/interfaces/auth.interface";

export const getUserCredentials = async () => {
  let token = cookies().get('user')?.value;
  if (!token) return null;
  const credentials = JSON.parse(token) as Data;
  return credentials;
}

export const isValidJWT = async (token: string) => {
  const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET ?? "";
  return new Promise((resolve) => {
    jwt.verify(token, JWT_SECRET, function (err) {
      if (err) resolve(false);
      return resolve(true);
    });
  });
}

// export const getJWTExpiration = async (token: string) => {
//   try {
//     // Decode the token to access expiration time (exp) claim
//     const decoded = jwt.decode(token);

//     // Check if token is valid before proceeding
//     if (!decoded) {
//       throw new Error('Invalid token');
//     }

//     // Extract expiration time (exp) claim from decoded token
//     const expirationTimestamp = decoded.exp;

//     // Convert expiration timestamp to a human-readable format (optional)
//     const expirationDate = new Date(expirationTimestamp * 1000); // Convert seconds to milliseconds
//     const formattedExpiration = expirationDate.toLocaleString();

//     // Return expiration timestamp (in seconds) or formatted date
//     return {
//       expirationTimestamp,
//       formattedExpiration: formattedExpiration || null, // Handle null for non-essential data
//     };
//   } catch (error) {
//     console.error('Error getting JWT expiration:', error);
//     return null; // Indicate error or invalid token
//   }
// };
