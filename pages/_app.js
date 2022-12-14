import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";
import { AuthContext } from "../utils/AuthContext";

function MyApp({ Component, pageProps }) {
  const [token, setToken] = useState(null);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthContext.Provider>
  );
}

export default MyApp;
