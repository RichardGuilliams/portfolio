import React from 'react';

const WelcomeEmail = ({ firstName, url, subject }) => (
  <div style={{ fontFamily: 'Arial', lineHeight: 1.6}}>
    <h1>{subject}</h1>
    <p>Hello there {firstName},</p>
    <p>Welcome to Richard Guilliams Blog! As a member you can now comment and reply to others on posts. Click the link below to verify your account:</p>
    <a href={url}>{url}</a>
    <p>Cheers,<br />Richard Gulliams.</p>
  </div>
);

export default WelcomeEmail;
