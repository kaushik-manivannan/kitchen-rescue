'use server'

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function identifyItemFromImage(base64Image: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            { 
              type: "text", 
              text: "Identify the item in this image. Provide the item name and, if visible, the quantity or amount. Format the response as a JSON object with 'name' and 'quantity' fields. If quantity isn't visible or can't be determined, set it to null. Do not include any markdown formatting or additional text. Use title case to format the name of each pantry item and the item name must always be plural." 
            },
            {
              type: "image_url",
              image_url: {
                "url": `data:image/jpeg;base64,${base64Image}`
              }
            },
          ],
        },
      ],
      max_tokens: 300,
    });

    const content = response.choices[0].message.content;
    if (content) {
      // Remove any potential markdown formatting
      const cleanedContent = content.replace(/```json\n?|\n?```/g, '').trim();
      
      try {
        // Parse the JSON response
        const itemInfo = JSON.parse(cleanedContent);

        // Ensure quantity is always present, default to null if not provided
      if (!('quantity' in itemInfo)) {
        itemInfo.quantity = null;
      }
        return itemInfo;
      } catch (parseError: any) {
        console.error('Error parsing JSON:', cleanedContent);
        throw new Error(`Failed to parse API response: ${parseError.message}`);
      }
    } else {
      throw new Error('No content in the API response');
    }
  } catch (error: any) {
    console.error('Error in identifyItemFromImage:', error);
    if (error.response) {
      console.error(error.response.status, error.response.data);
      throw new Error(`API error: ${error.response.status} ${error.response.data.error}`);
    } else {
      throw new Error(`Failed to process the image: ${error.message}`);
    }
  }
}