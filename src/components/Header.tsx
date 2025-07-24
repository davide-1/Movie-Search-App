
import React from 'react'
import { AppBar, Toolbar, Typography, Badge } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'

type HeaderProps = {
  favoriteCount: number
}

export default function Header({ favoriteCount }: HeaderProps) {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#141414' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          Movie Search
        </Typography>
        <Badge badgeContent={favoriteCount} color="error">
          <FavoriteIcon />
        </Badge>
      </Toolbar>
    </AppBar>
  )
}
