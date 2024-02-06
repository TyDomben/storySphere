import React from "react";
import { Container, Grid, Typography, Link } from "@mui/material";

function Footer() {
  // Define an array of links for easy mapping
  // this makes an easier edit in the future
  const linkSections = [
    { label: "Home", path: "/home" },
    { label: "Desk", path: "/desk" },
    { label: "Gallery", path: "/gallery" },
    { label: "About", path: "/about" },
  ];

  // Define an array for the company info sections
  // this makes an easier edit in the future
  // TODO make these links like above? maybe just all to my github or something?
  const infoSections = [
    "Newsletter Sign-up",
    "Contact Information",
    "Legal",
    "Accessibility",
    "Awards/Certifications",
    "Copyright Notice",
  ];

  return (
    <Container component="footer" style={{ padding: "20px 0" }}>
      <Grid container justifyContent="space-between" alignItems="center">
        {/* Left side - Production Notice */}
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">
            StorySphere is a Ty Domben production
          </Typography>
        </Grid>

        {/* Right side - Navigation Links */}
        <Grid item xs={12} sm={6}>
          {/* Stacking links vertically */}
          <Grid container direction="column" spacing={1}>
            {linkSections.map((section) => (
              <Grid item key={section.label}>
                <Link href={section.path} variant="body2">
                  {section.label}
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Company Info Sections */}

        {/* Aligns items to the end of the grid container (right side) */}
        {/* TODO : Stacking links vertically  I've spent enough time on this for right now */}
        <Grid container direction="column" justifyContent="flex-end" spacing={1}>
          {/* The map function will render each item in the infoSections array */}
          {infoSections.map((info) => (
            <Grid item key={info}>
              <Typography variant="body2">{info}</Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Footer;
