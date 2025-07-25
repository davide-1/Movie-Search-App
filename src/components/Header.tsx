
import React from 'react'
import { AppBar, Toolbar, Typography, Badge, IconButton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useFavorites } from '../context/FavoritesContext'
import { Link } from 'react-router-dom'

export default function Header() {
  const { favorites } = useFavorites()

  return (
    <AppBar position="static" sx={{ backgroundColor: '#141414' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component={Link} to="/" sx={{ color: 'inherit', textDecoration: 'none' }}>
          Movie Search
        </Typography>

        <IconButton component={Link} to="/favorites" sx={{ color: 'inherit' }}>
          <Badge badgeContent={favorites.length} color="error">
            <FavoriteIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

