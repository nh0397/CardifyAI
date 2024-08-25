import axios from "axios";

/**
 * Generates flashcards based on a user-provided topic.
 *
 * @param {string} topic - The topic for which to generate flashcards.
 * @returns {Promise<Array>} - A promise that resolves to an array of flashcards.
 */
const generateFlashcards = async (topic) => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

  try {
    const prompt = `
      Create a set of flashcards for the topic: ${topic}. 
      The output should be in the following JSON format:

      {
        "cards": [
          {
            "front": "Question or concept on the front of the card",
            "back": "Detailed explanation or answer on the back of the card"
          }
        ]
      }

      Follow these guidelines:
      1. Create clear and concise questions or concepts for the front of the flashcard.
      2. Provide accurate and informative answers or explanations for the back of the flashcard.
      3. Ensure that each flashcard focuses on a single concept or piece of information.
      4. Use simple language to make the flashcards accessible to a wide range of learners.
      5. Include a variety of question types, such as definitions, examples, comparisons, and applications.
      6. Avoid overly complex or ambiguous phrasing in both questions and answers.
      7. When appropriate, use mnemonics or memory aids to help reinforce the information.
      8. Tailor the difficulty level of the flashcards to the user's specified preferences.
      9. Aim to create a balanced set of flashcards that covers the topic comprehensively.
      Only return the JSON object. Do not include any additional text.
    `;

    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Raw response from API:", response.data);

    // Extract the JSON from the response text
    const jsonText = response.data.candidates[0].content.parts[0].text.trim();

    // Parse the JSON text, removing any unexpected characters
    const flashcardsContent = JSON.parse(jsonText);

    return flashcardsContent.cards;
  } catch (error) {
    console.error(
      "Failed to generate flashcards:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export default generateFlashcards;
