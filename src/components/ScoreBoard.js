import { Grid, Typography } from '@mui/material'
import React from 'react'

function ScoreBoard({ value, theme, options }) {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      sx={{
        background: options.gameBackgroundColor,
        height: 80,
        width: '100%',
        borderBottom: `2px dotted ${
          theme === 'nokia' ? options.snakeColor : options.gridColor
        }`,
      }}
    >
      <Grid item>
        <Typography
          sx={{
            fontFamily: 'ArcadeClassic',
            fontSize: 30,
            fontWeight: 600,
            color: options.textColor,
          }}
        >{`Score: ${value || 0}`}</Typography>
      </Grid>
    </Grid>
  )
}

export default ScoreBoard
