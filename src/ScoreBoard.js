import { Grid, Typography } from "@mui/material"
import React from "react"

function ScoreBoard({ value }) {
  return (
    <Grid
      container
      alignItems='center'
      justifyContent='center'
      sx={{
        background: "darkseagreen",
        border: "1px inset black",
        height: 80,
        width: 650,
        margin: "16px auto 16px auto",
      }}
    >
      <Grid item>
        <Typography sx={{ fontSize: 30, fontWeight: 600 }}>{`Score: ${value || 0}`}</Typography>
      </Grid>
    </Grid>
  )
}

export default ScoreBoard
