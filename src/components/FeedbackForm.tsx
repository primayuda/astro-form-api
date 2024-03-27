import { type FormEvent, useState } from "react";

export default function Form() {
  const [responseMessage, setResponseMessage] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const response = await fetch("/api/feedback", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.message) {
      setResponseMessage(data.message);
    }
  }

  return (
    <form onSubmit={submit}>
      <div className="grid min-h-screen place-items-center p-4">
        <div className="w-md">
        <label htmlFor="name">
            Name
          <input type="text" id="name" name="name" autoComplete="name" />
        </label>
        <br/>
        <label htmlFor="email">
            Email
          <input type="email" id="email" name="email" autoComplete="email" required />
        </label>
        <br />
        <label htmlFor="message">
            Message
          <textarea id="message" name="message" autoComplete="off" />
        </label>
        <button className="mt-2 w-full rounded-md bg-gradient-to-r from-purple-300 to-purple-400 px-4 py-3 font-semibold text-white shadow-lg mb-4">Send</button>
        {responseMessage && <p>{responseMessage}</p>}
        </div>
      </div>
      
    </form>
  );
}