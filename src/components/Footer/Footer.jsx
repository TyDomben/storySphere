import React from "react";
import { Container, Grid, Typography, Link } from "@mui/material";
// import { createTheme } from "@mui/material/styles";

// const theme = createTheme();

function Footer() {
  const linkSections = [
    { label: "Home", path: "/" },
    { label: "Desk", path: "/desk" },
    { label: "Gallery", path: "/gallery" },
    { label: "About", path: "/about" },
  ];

  const infoSections = [
    {
      label: "Newsletter Sign-up",
      path: "https://github.com/TyDomben/TyDomben",
    },
    {
      label: "Contact Information",
      path: "https://github.com/TyDomben/TyDomben",
    },
    { label: "Legal", path: "https://github.com/TyDomben/TyDomben" },

    { label: "Accessibility", path: "https://github.com/TyDomben/TyDomben" },
    {
      label: "Awards/Certifications",
      path: "https://github.com/TyDomben/TyDomben",
    },
    { label: "Copyright Notice", path: "https://github.com/TyDomben/TyDomben" },
    { label: "Privacy Policy", path: "https://github.com/TyDomben/TyDomben" },
    { label: "Terms of Service", path: "https://github.com/TyDomben/TyDomben" },
    { label: "Cookies Policy", path: "https://github.com/TyDomben/TyDomben" },
    {
      label: "Accessibility Statement",
      path: "https://github.com/TyDomben/TyDomben",
    },
    { label: "Disclaimer", path: "https://github.com/TyDomben/TyDomben" },
    { label: "Sitemap", path: "https://github.com/TyDomben/TyDomben" },
    { label: "RSS Feed", path: "https://github.com/TyDomben/TyDomben" },
  ];
  {
    /* Footer.jsx */
  }
  return (
    
    <Container
      // component="footer"

      
      // sx={{
      //   py: 5, // padding top and bottom
      //   backgroundColor: "#f7f7f7",
      //   color: "text.secondary", // theme-based color
      // }}
    >
      <Grid container spacing={2} justifyContent="space-between">
        {/* Production Notice */}
        <Grid item xs={12} sm={3}>
          <Typography variant="body1">
            StorySphere is a Ty Domben production
          </Typography>
        </Grid>

        {/* Navigation Links */}
        <Grid item xs={12} sm={3}>
          <Grid container direction="column" spacing={1}>
            {linkSections.map((section) => (
              <Grid item key={section.label}>
                <Link href={section.path} variant="body2" color="inherit">
                  {section.label}
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Company Info Links */}
        {/* Split into two columns */}
        <Grid item xs={12} sm={3}>
          <Grid container direction="column" spacing={1}>
            {infoSections
              .slice(0, Math.ceil(infoSections.length / 2))
              .map((info) => (
                <Grid item key={info.label}>
                  <Link href={info.path} variant="body2" color="inherit">
                    {info.label}
                  </Link>
                </Grid>
              ))}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Grid container direction="column" spacing={1}>
            {infoSections
              .slice(Math.ceil(infoSections.length / 2))
              .map((info) => (
                <Grid item key={info.label}>
                  <Link href={info.path} variant="body2" color="inherit">
                    {info.label}
                  </Link>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Footer;
