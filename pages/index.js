import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";
//Utils
import usePortal from "../utils/usePortal";

const App = () => (
  <div id="grid-parent">
    <Form />
  </div>
);

const Form = ({ id }) => {
  const [state, handleSubmit] = useForm("contactForm");
  const form = useRef(null);

  console.log(state);

  useEffect(() => {
    if (state.succeeded) {
      form.current.reset();
    }
  }, [state]);

  return (
    <div className="md:max-w-xl my-12 p-5 md:p-8">
      {state.succeeded ? (
        <Modal id={id}>
          <motion.div
            initial="pageInitial"
            animate="pageAnimate"
            variants={{
              pageInitial: {
                opacity: 0,
                translateY: "-35rem",
              },
              pageAnimate: {
                opacity: 1,
                translateY: "-38rem",
              },
            }}
            transition={{ duration: 0.7 }}
            className="flex justify-center w-full md:max-w-xl"
          >
            <p className="text-center text-gray-700 bg-green-300 font-bold shadow-xl rounded-xl w-40 h-14 p-4">
              ¡Sent!{" "}
              <span role="img" aria-label="thumb">
                👍 &nbsp;
              </span>
              <span role="img" aria-label="party">
                🎉
              </span>
            </p>
          </motion.div>
        </Modal>
      ) : (
        <></>
      )}
      <motion.div
        initial="pageInitial"
        animate="pageAnimate"
        variants={{
          pageInitial: {
            opacity: 0,
            translateY: 250,
          },
          pageAnimate: {
            opacity: 1,
            translateY: 0,
          },
        }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <form
          ref={form}
          className="flex flex-col rounded-3xl md:rounded-2xl shadow-lg p-2 md:p-4"
          onSubmit={handleSubmit}
        >
          <label htmlFor="name" className="px-4 py-3 md:py-2 pt-6">
            <input
              name="Name"
              id="name"
              type="text"
              className="bg-gray-200 font-medium rounded-lg px-4 py-2 w-full"
              placeholder="Full Name"
              required
            />
            <ValidationError prefix="Name" field="name" errors={state.errors} />
          </label>
          <label htmlFor="email" className="px-4 py-2">
            <input
              name="Email"
              id="email"
              type="email"
              className="bg-gray-200 font-medium rounded-lg px-4 py-2 w-full"
              placeholder="E-mail"
              required
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
          </label>
          <label htmlFor="phone" className="px-4 py-2">
            <input
              name="Phone"
              id="phone"
              type="text"
              className="bg-gray-200 font-medium rounded-lg px-4 py-2 w-full"
              placeholder="Phone Number"
            />
          </label>
          <label htmlFor="text" className="px-4 py-2">
            <textarea
              name="Text"
              id="text"
              type="text"
              className="bg-gray-200 font-medium rounded-lg px-4 py-2 w-full"
              placeholder="Add some text here, anything you want about my business..."
              required
            />
          </label>
          <div className="flex justify-center p-2">
            <button
              type="submit"
              disabled={state.submitting}
              className="bg-green-400 font-semibold rounded-full py-3 px-8"
            >
              Send
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const Modal = ({ id, children }) => {
  const target = usePortal(id);

  return createPortal(children, target);
};

export default App;
