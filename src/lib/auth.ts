
// This file contains Replit Auth helper functions

interface Window {
  LoginWithReplit?: () => void;
}

declare global {
  interface Window {
    LoginWithReplit?: () => void;
  }
}

export function initReplitAuth() {
  if (typeof window !== 'undefined') {
    window.LoginWithReplit = function() {
      window.addEventListener("message", authComplete);
      var h = 500;
      var w = 350;
      var left = screen.width / 2 - w / 2;
      var top = screen.height / 2 - h / 2;

      var authWindow = window.open(
        "https://replit.com/auth_with_repl_site?domain=" + location.host,
        "_blank",
        "modal=yes, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" +
          w +
          ", height=" +
          h +
          ", top=" +
          top +
          ", left=" +
          left
      );

      function authComplete(e) {
        if (e.data !== "auth_complete") {
          return;
        }

        window.removeEventListener("message", authComplete);

        if (authWindow) {
          authWindow.close();
        }
        location.reload();
      }
    };
  }
}

export async function getReplitUser() {
  if (typeof window !== 'undefined') {
    try {
      const response = await fetch('/__replauthuser');
      if (response.status === 200) {
        return await response.json();
      }
    } catch (error) {
      console.error('Error fetching Replit user:', error);
    }
    return null;
  }
  return null;
}
