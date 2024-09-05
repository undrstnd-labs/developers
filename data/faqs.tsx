export const faqs = [
  {
    section: "General",
    qa: [
      {
        question: "What is Undrstnd Developers API?",
        answer: (
          <span>
            Undrstnd Developers API is designed to enhance the user experience
            by providing access to powerful AI models. This documentation will
            guide you through the process of integrating our API into your
            projects.
          </span>
        ),
      },
      {
        question: "Where is the API hosted?",
        answer: (
          <span>
            The API is hosted at:{" "}
            <a href="http://dev.undrstnd-labs.com">dev.undrstnd-labs.com</a>
          </span>
        ),
      },
      {
        question: "Is the API free to use?",
        answer: (
          <span>
            The API has a pricing structure based on the usage of tokens. You
            can find the pricing details in the Pricing section of this
            documentation.
          </span>
        ),
      },
      {
        question: "How can I get started with the API?",
        answer: (
          <span>
            To get started, you can refer to the documentation which provides
            detailed instructions on how to integrate the API into your
            projects. You will need an API key, which you can request by sending
            a message to{" "}
            <a href="mailto:info@undrstnd-labs.com">info@undrstnd-labs.com</a>.
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
            We have three types of endpoints:
            <ul>
              <li>
                <strong>Predict</strong> - The AI endpoint.
              </li>
              <li>
                <strong>Models</strong> - Retrieve all models we support.
              </li>
              <li>
                <strong>Info</strong> - Get information about a specific model.
              </li>
            </ul>
          </span>
        ),
      },
    ],
  },
  {
    section: "Predict Endpoint",
    qa: [
      {
        question: "How do I access the Predict endpoint?",
        answer: (
          <span>
            The predict endpoint is used to generate AI responses based on a
            given model. You can access it with a POST request to the following
            URL:
            <pre>
              https://dev.undrstnd-labs.com/api/models/{"MODEL_ID"}/predict
            </pre>
            You can get the <code>MODEL_ID</code> from the models endpoint:{" "}
            <a href="https://dev.undrstnd-labs.com/api/models/info">
              https://dev.undrstnd-labs.com/api/models/info
            </a>
          </span>
        ),
      },
      {
        question: "What parameters can I use in the Predict endpoint?",
        answer: (
          <span>
            Here are the parameters you can use in the predict endpoint:
            <ul>
              <li>
                <strong>stream</strong>: Boolean (<code>true</code> or{" "}
                <code>false</code>). If <code>true</code>, the response will be
                streamed.
              </li>
              <li>
                <strong>system</strong>: A system message that will be part of
                the prompt.
              </li>
              <li>
                <strong>prompt</strong>: A simple text prompt. You can either
                use <code>prompt</code> or <code>messages</code> but not both.
              </li>
              <li>
                <strong>messages</strong>: A list of messages. You can either
                use <code>prompt</code> or <code>messages</code> but not both.
                This supports full consciousness conversations without any
                hallucinations.
              </li>
            </ul>
          </span>
        ),
      },
    ],
  },
  {
    section: "Models Endpoint",
    qa: [
      {
        question: "How do I retrieve a list of all supported models?",
        answer: (
          <span>
            To retrieve a list of all supported models, make a GET request to
            the following URL:
            <pre>https://dev.undrstnd-labs.com/api/models</pre>
          </span>
        ),
      },
    ],
  },
  {
    section: "Info Endpoint",
    qa: [
      {
        question: "How do I get information about a specific model?",
        answer: (
          <span>
            To get information about a specific model, make a GET request to the
            following URL:
            <pre>
              https://dev.undrstnd-labs.com/api/models/{"MODEL_ID"}/info
            </pre>
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
            Each model has a pricing structure. The prices below are per 1
            million tokens.
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
      {
        question: "How do I know how many tokens I have used?",
        answer: (
          <span>
            The response from the Predict endpoint includes a <code>usage</code>{" "}
            field that indicates the number of tokens used by the request.
          </span>
        ),
      },
    ],
  },
  {
    section: "Security and Support",
    qa: [
      {
        question: "How do you ensure the security of transactions?",
        answer: (
          <span>
            We use secure payment gateways and an escrow system to protect funds
            until the transaction is successfully completed.
          </span>
        ),
      },
      {
        question: "What happens in case of a dispute?",
        answer: (
          <span>
            In case of a dispute, Undrstnd Developers offers mediation to
            resolve issues between the client and the agency, ensuring that
            funds are handled fairly.
          </span>
        ),
      },
      {
        question: "How can I contact support?",
        answer: (
          <span>
            You can contact our support team by sending an email to{" "}
            <a href="mailto:info@undrstnd-labs.com">info@undrstnd-labs.com</a>.
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
