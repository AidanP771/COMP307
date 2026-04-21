const buildMailto = (to, subject, body) => {
  
  let cleanTo = to.trim().toLowerCase();

  if (cleanTo.startsWith('mailto:')) {
    cleanTo = cleanTo.replace('mailto:', '');
  }

  const encodedSubject = encodeURIComponent(subject.trim());
  const encodedBody = encodeURIComponent(body.trim());

  return `mailto:${cleanTo}?subject=${encodedSubject}&body=${encodedBody}`;
};

// Export the function (CommonJS syntax for Node.js)
module.exports = {buildMailto};