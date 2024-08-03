"use client";

import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Paper,
} from '@mui/material';
import { generateRecipes } from "@/utils/actions";

interface RecipeFormProps {
  setRecipes: (recipes: any[]) => void;
}

export default function RecipeForm({ setRecipes }: RecipeFormProps) {
  const [formData, setFormData] = useState({
    ingredients: '',
    cookingTime: '',
    cuisine: '',
    noOfPeople: '',
    dietaryRestriction: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await generateRecipes(
      formData.ingredients,
      formData.cookingTime,
      formData.cuisine,
      formData.noOfPeople,
      formData.dietaryRestriction
    );
    setRecipes(result);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, height: '100%', borderRadius: 5}}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: { xs: '2.5rem', sm: '3rem' },
      }}>
        Discover Recipes
      </Typography>
      <Typography variant="body1" gutterBottom align="center" sx={{
        fontWeight: 'light'
      }}>
        SOS Cooking: Enter your details for appetizing recipes!
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              name="ingredients"
              label="Extra Ingredients"
              placeholder="If you'd like to add extra ingredients apart from the ones in your inventory, please specify them here"
              variant="outlined"
              value={formData.ingredients}
              onChange={handleChange}
              required
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="cookingTime"
              label="Cooking time"
              variant="outlined"
              value={formData.cookingTime}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              placeholder="e.g. 1 hour"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="cuisine"
              label="Cuisine"
              variant="outlined"
              value={formData.cuisine}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              placeholder="e.g. Indian"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="dietaryRestriction"
              label="Dietary restrictions"
              variant="outlined"
              value={formData.dietaryRestriction}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              placeholder="e.g. Vegan, Lactose Free, Gluten Free"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="noOfPeople"
              label="Number of people"
              type="number"
              variant="outlined"
              InputProps={{ inputProps: { min: 1, max: 30} }}
              value={formData.noOfPeople}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              placeholder="e.g. 1-30"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{
                mt: 2,
                backgroundColor: 'secondary.main',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'secondary.dark',
                }
              }}
            >
              Rescue Me!
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}