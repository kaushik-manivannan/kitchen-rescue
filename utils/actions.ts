'use server'

import { ChatOpenAI } from "@langchain/openai";

const chatModel = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    model: 'gpt-4o-mini'
});

export async function generateRecipes(ingredients: string, cookingTime: string, cuisine: string, noOfPeople: string, dietaryRestriction: string) {
    const prompt = `Generate one recipe for a dish consisting primarily of ${ingredients}. The maximum cooking time of the recipe must be ${cookingTime}. The cuisine of the recipe must strictly be ${cuisine}. The quantity of the ingredients must be such that the recipe can be made for ${noOfPeople} people. Finally, make sure that the recipe follows the dietary restrictions like ${dietaryRestriction}. The output must be a JSON array and each object must contain a recipe name field named 'name', description field named 'description', array of ingredients named 'ingredients', and array of step by step instructions named 'instructions'. Do not add any other additional fields or any additional content on top of what I've asked.`;

    const response = await chatModel.invoke(prompt);
    const res = response.content as string
    const cleanResponse = res.replace(/^```json\n/, '').replace(/```$/, '').trim();

    return JSON.parse(cleanResponse);
};