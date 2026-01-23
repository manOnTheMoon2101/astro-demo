<script lang="ts">
  import formBG from "../assets/images/formBG.webp";

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

<div class="min-h-[400px] md:h-96 flex flex-col lg:flex-row justify-around text-white relative px-4">
  <div
    style={`background-image: url(${formBG.src})`}
    class="absolute inset-0 bg-cover bg-center bg-no-repeat"
  ></div>
  <div class="absolute inset-0 bg-[#0C1424]/80"></div>
  <div class="flex flex-col lg:flex-row justify-around items-start relative z-10 w-full gap-8 py-8 lg:py-0">
    <div class="p-6 md:p-12 text-center lg:text-left">
      <h2 class="text-3xl md:text-4xl lg:text-6xl">Get In Touch</h2>

      <p class="text-sm md:text-base">
        We guarantee continuous support, updating and repair to<br class="hidden md:block" />ensure the
        optimal performance of your systems.
      </p>
    </div>

    <div class="p-6 md:p-12 w-full max-w-2xl">
      <form onsubmit={handleSubmit}>
        <div class="flex flex-col md:flex-row my-6 gap-4">
          <input
            placeholder="Your Name"
            bind:value={x.name}
            required
            class="border-b text-lg md:text-2xl bg-transparent text-white placeholder-gray-300 w-full"
            disabled={isSubmitting}
          />
          <input
            type="email"
            placeholder="Your Email"
            bind:value={x.email}
            required
            class="border-b text-lg md:text-2xl bg-transparent text-white placeholder-gray-300 w-full"
            disabled={isSubmitting}
          />
        </div>

        <div class="flex flex-col md:flex-row gap-4">
          <input
            type="tel"
            placeholder="Your Phone"
            class="border-b text-lg md:text-2xl bg-transparent text-white placeholder-gray-300 w-full"
            bind:value={x.phone}
            disabled={isSubmitting}
          />

          <input
            placeholder="Subject"
            bind:value={x.subject}
            required
            class="border-b text-lg md:text-2xl bg-transparent text-white placeholder-gray-300 w-full"
            disabled={isSubmitting}
          />
        </div>

        <div class="flex flex-row my-6">
          <textarea
            placeholder="Tell us about your project"
            bind:value={x.description}
            required
            class="border-b text-lg md:text-2xl bg-transparent text-white placeholder-gray-300 w-full min-h-[100px] resize-none"
            disabled={isSubmitting}
          ></textarea>
        </div>

        {#if message}
          <div
            class="my-4 p-3 rounded-lg {messageType === 'error'
              ? 'bg-red-100 border border-red-400 text-red-700'
              : 'bg-green-100 border border-green-400 text-green-700'}"
          >
            {#if messageType === "error"}
              <div class="flex items-center">
                <span class="font-medium text-sm md:text-base">Error: {message}</span>
              </div>
            {:else}
              <div class="flex items-center">
                <span class="font-medium text-sm md:text-base">Success: {message}</span>
              </div>
            {/if}
          </div>
        {/if}

        <button
          class="bg-[#C4062A] p-3 md:p-4 rounded-full self-center px-8 md:px-12 cursor-pointer text-sm md:text-base w-full md:w-auto"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  </div>
</div>
