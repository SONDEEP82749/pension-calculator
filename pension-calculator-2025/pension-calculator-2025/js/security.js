// security.js - client-side deterrents only
document.addEventListener('contextmenu', function(e){ e.preventDefault(); });
document.onkeydown = function(e) {
  // Disable F12
  if(e.keyCode === 123) { e.preventDefault(); return false; }
  // Disable Ctrl+Shift+I/J and Ctrl+U
  if(e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) { e.preventDefault(); return false; }
  if(e.ctrlKey && e.keyCode === 85) { e.preventDefault(); return false; }
};
