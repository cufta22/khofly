import { Dispatch, SetStateAction } from "react";

interface Args {
  decoder: TextDecoder;
  reader: ReadableStreamDefaultReader<Uint8Array<ArrayBufferLike>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  handleUpdateStream: (val: string) => void;
  handleDONE: () => void;
}

export const processSSE = async ({
  decoder,
  reader,
  setIsLoading,
  handleUpdateStream,
  handleDONE,
}: Args) => {
  let chunk = ""; // Buffer for partial SSE messages

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      setIsLoading(false);
      break;
    }

    // Decode and process the chunk
    chunk += decoder.decode(value, { stream: true });

    // Process complete SSE messages in the buffer
    // SSE messages are separated by double newlines "\n\n"
    let boundary = chunk.indexOf("\n\n");
    while (boundary !== -1) {
      const message = chunk.substring(0, boundary); // Get one complete message block
      chunk = chunk.substring(boundary + 2); // Remove message block from buffer

      // Find the start of the JSON data after "data: "
      const dataPrefix = "data: ";
      if (message.startsWith(dataPrefix)) {
        const jsonString = message.substring(dataPrefix.length).trim();

        // Handle the special [DONE] message if the API sends it
        if (jsonString === "[DONE]") {
          handleDONE();
          continue; // Skip to next message or loop iteration
        }

        try {
          const parsed = JSON.parse(jsonString);
          if (parsed?.response) {
            // Handle CF stream
            handleUpdateStream(parsed?.response);
          } else if (parsed?.text) {
            // Handle Gemini stream
            handleUpdateStream(parsed?.text);
          } else {
            // Handle cases where JSON is valid but doesn't have 'response'
          }
        } catch (parseError) {
          // Handle JSON parsing errors - maybe log them, maybe show an error
        }
      } else if (message.trim()) {
        // Optional: Handle other SSE lines like comments (starting with ':') or event types ('event: ...') if needed
        // console.log("Received non-data SSE line:", message);
      }

      // Check for the next message boundary in the updated buffer
      boundary = chunk.indexOf("\n\n");
    }
  }
};
