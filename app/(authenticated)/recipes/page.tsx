'use client';

import { Box, Grid } from "@mui/material";
import { useState } from "react";
import RecipesList from "@/components/RecipesList";
import RecipeForm from "@/components/RecipeForm";

export default function Recipes() {
  
  const [recipes, setRecipes] = useState<any[]>([]);

  return (
    <Box sx={{ flexGrow: 1, p: 3, mt: 10}}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <RecipeForm setRecipes={setRecipes} />
        </Grid>
        <Grid item xs={12} md={6}>
          <RecipesList recipes={recipes} />
        </Grid>
      </Grid>
    </Box>
  );
}