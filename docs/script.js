let visitCountElement = document.getElementById("visit-count");


window.addEventListener('DOMContentLoaded', () => {
    fetch('https://x4dd0atk82.execute-api.us-east-1.amazonaws.com/addUserCount')
      .then(response => {
        if (!response.ok) throw new Error("API error");
        return response.json();
      })
      .then(data => {
        console.log("API response:", data);
        fetch("https://x4dd0atk82.execute-api.us-east-1.amazonaws.com/getUserCount")
        .then(res => res.json())
        .then(data => {
          let visitCount = data.user_count;
          document.getElementById("visit-count").textContent = visitCount;
        });
      })
      .catch(error => {
        console.error("Failed to call API:", error);
      });



  }, { once: true });