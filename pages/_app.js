import { FormspreeProvider } from "@formspree/react";
import "../styles/main.css";

function MyApp({ Component, pageProps }) {
  return (
    <FormspreeProvider project="YOUR_PROJECT_ID">
      <Component {...pageProps} />
    </FormspreeProvider>
  );
}

export default MyApp;
