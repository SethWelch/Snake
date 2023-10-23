import { Grid, Typography } from '@mui/material'
import React from 'react'

function ScoreBoard({ value, options }) {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      sx={{
        background: options.gameBackgroundColor,
        height: 80,
        width: 512,
        margin: '16px auto 4px auto',
      }}
    >
      <Grid item>
        <Typography
          sx={{ fontSize: 30, fontWeight: 600, color: options.textColor }}
        >{`Score: ${value || 0}`}</Typography>
      </Grid>
    </Grid>
  )
}

export default ScoreBoard
