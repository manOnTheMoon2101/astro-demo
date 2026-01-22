<script>
  import motherboard from "../assets/images/motherboard.png";
  let x = $state({
    name: "",
    email: "",
    phone: "",
    subject: "",
    description: "",
  });

  let isSubmitting = $state(false);
  let message = $state("");
  let messageType = $state("");

  async function handleSubmit(event) {
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
    } catch (error) {
      console.error("Form submission error:", error);
      messageType = "error";
      message = `Network error: ${error.message}`;
    } finally {
      isSubmitting = false;
    }
  }
</script>

<div
  style={`background-image: url(${motherboard.src})`}
  class="flex flex-row justify-around text-white"
>
  <div>
    <h2 class="text-6xl">Get In Touch</h2>

    <p>
      We guarantee continuous support, updating and repair to ensure the optimal
      performance of your systems.
    </p>
  </div>

  <div>
    {#if message}
      <div class="message {messageType}">
        {message}
      </div>
    {/if}

    <form onsubmit={handleSubmit}>
      <input
        placeholder="Your Name"
        bind:value={x.name}
        required
        class="border-b"
        disabled={isSubmitting}
      />
      <input
        type="email"
        placeholder="Your Email"
        bind:value={x.email}
        required
        class="border-b"
        disabled={isSubmitting}
      />
      <input
        type="tel"
        placeholder="Your Phone"
        bind:value={x.phone}
        disabled={isSubmitting}
      />
      <input
        placeholder="Subject"
        bind:value={x.subject}
        required
        class="border-b"
        disabled={isSubmitting}
      />

      <textarea
        placeholder="Tell us about you project"
        bind:value={x.description}
        required
        class="border-b"
        disabled={isSubmitting}
      ></textarea>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  </div>
</div>
