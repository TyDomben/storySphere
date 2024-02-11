import React, { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Box,
  Link,
} from "@mui/material";

function AboutPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Dispatch the email to your store or server
    console.log(email);
    // Show a confirmation message or send a confirmation email
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={6} sx={{ p: 4 }}>
        <Typography variant="body1">
          Storysphere is a labor of love. I'm Ty the "Author" of this
          application and I want to thank you for checking this out. I hope you
          enjoy it.
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          I'm looking for full time employment following my graduation from
          Prime and encourage you to check out my Github and LinkedIn.
          <Link
            href="https://github.com/[your-github-username]"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub{" "}
          </Link>{" "}
          and
          <Link
            href="https://www.linkedin.com/in/[your-linkedin-profile]"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn{" "}
          </Link>
          .
        </Typography>

        <Typography variant="body1" style={{ marginTop: "1rem" }}>
          {" "}
          StorySphere: Where Words Come to Life…
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Join Our Newsletter
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            (It's a great way to practice CRUD...
            <Link
              href="https://en.wikipedia.org/wiki/Create,_read,_update_and_delete"
              target="_blank"
              rel="noopener noreferrer"
            >
              learn more
            </Link>
            )
          </Typography>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mb: 2 }}>
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default AboutPage;
