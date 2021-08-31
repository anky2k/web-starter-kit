function CopyToClipBoard(value) {
  if (!value) return false;
  const tempInput = document.createElement('input');
  tempInput.value = value;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
  return true;
}

export {
  CopyToClipBoard
};

