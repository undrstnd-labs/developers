export const faqs = [
  {
    section: "General",
    qa: [
      {
        question: "What is Undrstnd Developers API?",
        answer: (
          <span>
            Undrstnd Developers API is a powerful tool that allows you to
            integrate advanced AI models into your applications. This API
            provides access to a variety of models, from chat functionalities to
            advanced reasoning tasks.
          </span>
        ),
      },
      {
        question: "Where is the API hosted?",
        answer: (
          <span>
            The API is hosted at:{" "}
            <a href="https://dev.undrstnd-labs.com/api">
              <strong>https://dev.undrstnd-labs.com/api</strong>
            </a>
          </span>
        ),
      },
      {
        question: "Is the API free to use?",
        answer: (
          <span>
            The API has a pricing structure based on usage. You can find the
            pricing details in the <strong>Pricing</strong> section of this
            documentation.
          </span>
        ),
      },
      {
        question: "How can I get started with the API?",
        answer: (
          <span>
            To get started, you&apos;ll need an API key. You can request an API
            key by contacting us at{" "}
            <a href="mailto:info@undrstnd-labs.com">
              <strong>info@undrstnd-labs.com</strong>
            </a>
            . Once you have your API key, you can start making requests to our
            endpoints.
          </span>
        ),
      },
    ],
  },
  {
    section: "API Endpoints",
    qa: [
      {
        question: "What types of endpoints are available?",
        answer: (
          <span>
            We have two types of endpoints:
            <ul>
              <li>
                <strong>Model Information Endpoints</strong>: These endpoints
                allow you to retrieve information about the models available in
                the API.
              </li>
              <li>
                <strong>Chat Compilation Endpoint</strong>: This is the main
                endpoint that enables you to interact with our AI models through
                chat.
              </li>
            </ul>
          </span>
        ),
      },
    ],
  },
  {
    section: "Chat Compilation Endpoint",
    qa: [
      {
        question: "How do I access the Chat Compilation endpoint?",
        answer: (
          <span>
            The Chat Compilation endpoint is used to interact with our AI
            models. You can access it with a POST request to the following URL:
            <pre>
              <code>POST https://dev.undrstnd-labs.com/api</code>
            </pre>
            In the headers <code>{"x-api-key"}</code> should be set to your API
            key.
          </span>
        ),
      },
      {
        question: "What parameters can I use in the Chat Compilation endpoint?",
        answer: (
          <span>
            Here are the parameters you can use in the Chat Compilation
            endpoint:
            <ul>
              <li>
                <strong>stream</strong>: Boolean (<code>true</code> or{" "}
                <code>false</code>). Indicates whether the response should be
                streamed.
              </li>
              <li>
                <strong>modelId</strong>: The ID of the model you wish to use.
              </li>
              <li>
                <strong>system</strong>: A system message that is part of the
                prompt context (optional).
              </li>
              <li>
                <strong>prompt</strong>: A simple text input. You can either use{" "}
                <code>prompt</code> or <code>messages</code>, but not both.
              </li>
              <li>
                <strong>messages</strong>: A list of message objects for a
                conversational history. Supports full conversation context
                without hallucinations. You can either use <code>prompt</code>{" "}
                or <code>messages</code>, but not both.
              </li>
            </ul>
          </span>
        ),
      },
    ],
  },
  {
    section: "Model Information Endpoints",
    qa: [
      {
        question: "How do I retrieve a list of all supported models?",
        answer: (
          <span>
            To retrieve a list of all supported models, make a GET request to
            the following URL:
            <pre>
              <code>GET https://dev.undrstnd-labs.com/api/models/info</code>
            </pre>
          </span>
        ),
      },
      {
        question: "How do I get information about a specific model?",
        answer: (
          <span>
            To get information about a specific model, make a GET request to the
            following URL:
            <pre>
              <code>
                GET https://dev.undrstnd-labs.com/api/models/{"MODEL_ID"}/info
              </code>
            </pre>
            Replace <code>{"MODEL_ID"}</code> with the specific model&apos;s ID
            to get more details.
          </span>
        ),
      },
    ],
  },
  {
    section: "Pricing",
    qa: [
      {
        question: "What is the pricing structure for the models?",
        answer: (
          <span>
            Here is the pricing structure for each model, based on usage per 1
            million tokens:
            <table>
              <thead>
                <tr>
                  <th>Model Name</th>
                  <th>Pricing (EUR)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Distil Whisper Large v3 En</td>
                  <td>€0.052</td>
                </tr>
                <tr>
                  <td>Gemma 2 9B Italian</td>
                  <td>€0.52</td>
                </tr>
                <tr>
                  <td>Gemma 7B Italian</td>
                  <td>€0.182</td>
                </tr>
                <tr>
                  <td>Llama 3 Groq 70B Tool Use (Preview)</td>
                  <td>€2.314</td>
                </tr>
                <tr>
                  <td>Llama 3 Groq 8B Tool Use (Preview)</td>
                  <td>€0.494</td>
                </tr>
                <tr>
                  <td>Llama 3.1 405B</td>
                  <td>€5.2</td>
                </tr>
                <tr>
                  <td>Llama 3.1 70B Versatile</td>
                  <td>€2.314</td>
                </tr>
                <tr>
                  <td>Llama 3.1 8B Instant</td>
                  <td>€0.598</td>
                </tr>
                <tr>
                  <td>Llama Guard 3 8B</td>
                  <td>€0.52</td>
                </tr>
                <tr>
                  <td>Meta Llama 3 70B</td>
                  <td>€2.054</td>
                </tr>
                <tr>
                  <td>Meta Llama 3 8B</td>
                  <td>€0.208</td>
                </tr>
                <tr>
                  <td>Mixtral 8x7B</td>
                  <td>€0.624</td>
                </tr>
                <tr>
                  <td>Whisper Large v3</td>
                  <td>€0.078</td>
                </tr>
              </tbody>
            </table>
          </span>
        ),
      },
    ],
  },
  {
    section: "Usage and Integration",
    qa: [
      {
        question: "Can I use the API for commercial purposes?",
        answer: (
          <span>
            Yes, you can use the API for commercial purposes. Please refer to
            our terms of service for more details.
          </span>
        ),
      },
      {
        question: "Do I need any special software to use the API?",
        answer: (
          <span>
            No, you do not need any special software. You can make HTTP requests
            to our API endpoints using any programming language or tool that
            supports HTTP requests.
          </span>
        ),
      },
      {
        question: "What kind of support do you offer for integration?",
        answer: (
          <span>
            We offer comprehensive documentation and support through our
            customer service team. You can also find example code and tutorials
            in our documentation.
          </span>
        ),
      },
    ],
  },
]
