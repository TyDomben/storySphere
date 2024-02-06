import React from "react";
import { Container, Grid, Typography, Link } from "@mui/material";

function Footer() {
  return (
    <Container component="footer" sx={{ padding: "20px 0" }}>
      <Grid container justifyContent="space-between" alignItems="center">
        {/* Production Notice: Use Typography for semantic and accessible text rendering */}
        <Grid item xs={12} sm={4}>
          <Typography variant="subtitle1" sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
            StorySphere is a Ty Domben production
          </Typography>
        </Grid>

        {/* Navigation Links: Using Grid to organize links into a responsive layout */}
        <Grid item xs={12} sm={8}>
          <Grid container spacing={2} justifyContent="flex-end" alignItems="center">
            {/* Mapping over an array of link objects could be more maintainable */}
            {['Home', 'Desk', 'Gallery', 'About'].map((text) => (
              <Grid item key={text}>
                <Link href={`/${text.toLowerCase()}`} variant="body2">
                  {text}
                </Link>
              </Grid>
            ))}

            {/* Additional Information: Placed in a single block for now, but should be split if they are separate links */}
            <Grid item xs={12} sx={{ textAlign: 'center', mt: { sm: 2, xs: 1 } }}>
              <Typography variant="body2">
                [Newsletter Sign-up] [Contact Information] [Legal] [Accessibility] [Awards/Certifications] [Copyright Notice]
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Footer;
