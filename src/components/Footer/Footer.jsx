/**
 * Footer Component
 *
 * Overview:
 * The Footer component provides navigational links and important informational links for users at the bottom of the application.
 * It is divided into sections for easy navigation and access to various pages and external resources.
 *
 * Features:
 * - Dynamic rendering of navigational links to key sections of the application such as Home, Desk, Gallery, and About.
 * - An extensive list of informational links including legal notices, contact information, and policies, all pointing to placeholder URLs.
 * - Responsive design that adjusts the layout of link sections based on screen size, ensuring accessibility and usability across devices.
 *
 * Structure:
 * - Utilizes Material UI's `Container`, `Grid`, and `Typography` components for layout and styling.
 * - Navigation links and company info links are stored in arrays and mapped to render, allowing easy updates and maintenance.
 * - Divides company info links into two columns for a balanced visual presentation in larger screen sizes.
 *
 * Implementation Details:
 * - `linkSections` array contains objects with labels and paths for navigational links within the app.
 * - `infoSections` array contains objects with labels and paths for external informational links, currently all set to the same placeholder URL for demonstration purposes.
 * - Responsive layout achieved through Material UI's `Grid` system, adjusting the number of columns based on the screen size.
 *
 * Usage:
 * This component is intended to be used at the bottom of all pages within the application, providing a consistent footer across the site.
 *
 * Future Enhancements:
 * - Actual URLs should replace the placeholder GitHub links in `infoSections` to point to relevant legal and policy documents.
 * - Consider adding a "back to top" button for improved navigation in longer pages.
 * - Expand the footer content to include social media links, certifications, or other relevant information as the application grows.
 */

import React from "react";
import { Container, Grid, Typography, Link } from "@mui/material";

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
      // ? adjust path to ABOUT PAGE
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
