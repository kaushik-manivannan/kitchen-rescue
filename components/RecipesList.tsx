"use client";

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  List,
  ListItem,
  Box,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/system';

interface Recipe {
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
}

interface RecipesListProps {
  recipes: Recipe[];
}

// Styled component for custom scrollbar
const ScrollableCard = styled(Card)(({ theme }) => ({
  '&::-webkit-scrollbar': {
    width: '10px',
  },
  '&::-webkit-scrollbar-track': {
    background: theme.palette.background.paper,
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.primary.main,
    borderRadius: '5px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: theme.palette.primary.dark,
  },
  scrollbarWidth: 'thin',
  scrollbarColor: `${theme.palette.primary.main} ${theme.palette.background.paper}`,
}));

export default function RecipesList({ recipes }: RecipesListProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper elevation={3} sx={{ 
      p: isMobile ? 2 : 4, 
      height: '100%', 
      overflowY: 'auto',
      borderRadius: 5
    }}>
      <Typography variant="h4" component="h2" gutterBottom align="center" sx={{
        textAlign: 'center', 
        fontWeight: 'bold', 
        fontSize: { xs: '2rem', sm: '3rem' },
        mb: isMobile ? 2 : 3,
      }}>
        Your Rescue Recipe
      </Typography>
      {recipes.length > 0 ? (
        recipes.map((recipe, i) => (
          <ScrollableCard
            key={i}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              p: isMobile ? 2 : 4,
              bgcolor: 'background.paper',
              border: 1,
              borderColor: 'divider',
              borderRadius: 2,
              overflowY: 'scroll',
              overflowX: 'hidden',
              maxHeight: '475px',
              mb: isMobile ? 2 : 4,
            }}
          >
            <CardHeader
              title={
                <Typography variant="h5" component="h2" color="text.primary" sx={{ fontSize: isMobile ? '1.25rem' : '1.5rem' }}>
                  {recipe.name}
                </Typography>
              }
              subheader={
                <Typography variant="body2" color="text.secondary" sx={{ mt: isMobile ? 1 : 2 }}>
                  {recipe.description}
                </Typography>
              }
            />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, mb: isMobile ? 2 : 4 }}>
                <Typography variant="h6" color="text.primary" sx={{ fontSize: isMobile ? '1rem' : '1.25rem' }}>
                  Ingredients:
                </Typography>
                <Box
                  sx={{
                    bgcolor: 'grey.100',
                    border: 1,
                    borderColor: 'grey.300',
                    borderRadius: 2,
                    p: isMobile ? 2 : 3,
                    mt: isMobile ? 1 : 2,
                    mb: isMobile ? 2 : 4,
                  }}
                >
                  <List sx={{ listStyleType: 'disc', pl: isMobile ? 2 : 4 }}>
                    {recipe.ingredients.map((ingredient: string, i: number) => (
                      <ListItem key={i} sx={{ display: 'list-item', py: 0 }}>
                        <Typography variant="body2" color="text.primary">
                          {ingredient}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </Box>
                <Typography variant="h6" color="text.primary" sx={{ fontSize: isMobile ? '1rem' : '1.25rem' }}>
                  Instructions:
                </Typography>
                <List sx={{ listStyleType: 'decimal', pl: isMobile ? 2 : 4 }}>
                  {recipe.instructions.map((step: string, i: number) => (
                    <ListItem key={i} sx={{ display: 'list-item' }}>
                      <Typography variant="body2" color="text.primary">
                        {step}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </CardContent>
          </ScrollableCard>
        ))
      ) : (
        <Typography variant="body1" align="center" sx={{
          fontWeight: 'light'
        }}>
          Your culinary rescue squad is standing by. Fill out the form to summon delicious recipes!
        </Typography>
      )}
    </Paper>
  );
}