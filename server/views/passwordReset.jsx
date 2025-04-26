import React from 'react';

const PasswordReset = ({ firstName, url, subject }) => (
  <div style={{ fontFamily: 'Arial', lineHeight: 1.6}}>
    <h1>{subject}</h1>
    <p>Hi {firstName},</p>
    <p>it seems you have forgotten your password, we understand how frustrating that is. Below you will find a link to reset it.</p>
    <a href={url}>{url}</a>
    <p>Cheers,<br />Richard Gulliams.</p>
  </div>
);

export default PasswordReset;
