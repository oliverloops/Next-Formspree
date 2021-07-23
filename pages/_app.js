import { FormspreeProvider } from "@formspree/react";
import "../styles/main.css";

function MyApp({ Component, pageProps }) {
  return (
    <FormspreeProvider project="1728250366899780717">
      <Component {...pageProps} />
    </FormspreeProvider>
  );
}

export default MyApp;
