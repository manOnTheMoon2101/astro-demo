<script lang="ts">
  import formBG from "../assets/images/formBG.png";

  interface FormInterface {
    name: string;
    email: string;
    phone: string;
    subject: string;
    description: string;
  }
  let x = $state<FormInterface>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    description: "",
  });

  let isSubmitting = $state<boolean>(false);
  let message = $state<string>("");
  let messageType = $state<string>("");

  async function handleSubmit(event: any) {
    event.preventDefault();

    if (isSubmitting) return;

    isSubmitting = true;
    message = "";

    try {
      console.log("Submitting form data:", x);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(x),
      });

      console.log("Response status:", response.status);
      const result = await response.json();
      console.log("Response data:", result);

      if (response.ok) {
        messageType = "success";
        message = result.message;
        x.name = "";
        x.email = "";
        x.phone = "";
        x.subject = "";
        x.description = "";
      } else {
        messageType = "error";
        message = `${result.message} (Status: ${response.status})`;
      }
    } catch (error: any) {
      console.error("Form submission error:", error);
      messageType = "error";
      message = `Network error: ${error?.message}`;
    } finally {
      isSubmitting = false;
    }
  }
</script>

<div class="h-96 flex flex-row justify-around text-white relative">
  <div
    style={`background-image: url(${formBG.src})`}
    class="absolute inset-0 bg-cover bg-center bg-no-repeat"
  ></div>
  <div class="absolute inset-0 bg-[#0C1424]/80"></div>
  <div class="flex flex-row justify-around items-start relative z-10 w-full">
    <div class="p-12">
      <h2 class="text-6xl">Get In Touch</h2>

      <p>
        We guarantee continuous support, updating and repair to<br />ensure the
        optimal performance of your systems.
      </p>
    </div>

    <div class="p-12">
      {#if message}
        <div class="message {messageType}">
          {message}
        </div>
      {/if}

      <form onsubmit={handleSubmit}>
        <div class="flex flex-row my-6">
          <input
            placeholder="Your Name"
            bind:value={x.name}
            required
            class="border-b text-2xl mx-2"
            disabled={isSubmitting}
          />
          <input
            type="email"
            placeholder="Your Email"
            bind:value={x.email}
            required
            class="border-b text-2xl mx-2"
            disabled={isSubmitting}
          />
        </div>

        <div class="flex flex-row">
          <input
            type="tel"
            placeholder="Your Phone"
            class="border-b text-2xl mx-2"
            bind:value={x.phone}
            disabled={isSubmitting}
          />
          <input
            placeholder="Subject"
            bind:value={x.subject}
            required
            class="border-b text-2xl mx-2"
            disabled={isSubmitting}
          />
        </div>

        <div class="flex flex-row my-6">
          <textarea
            placeholder="Tell us about you project"
            bind:value={x.description}
            required
            class="border-b text-2xl"
            disabled={isSubmitting}
          ></textarea>
        </div>

        <button
          class="bg-[#C4062A] p-4 rounded-full self-center px-12"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  </div>
</div>
