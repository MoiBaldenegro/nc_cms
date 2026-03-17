(function () {
  const container = document.getElementById('testimonials-widget');

  if (!container) return;
  fetch('http://localhost:3000/testimonials/public')
    .then((res) => res.json())
    .then((data) => {
      container.innerHTML = data
        .map(
          (t) => `
        <div style="
          border:1px solid #ddd;
          padding:10px;
          margin:10px;
          border-radius:10px;
          font-family:sans-serif;
        ">
          <p><strong>${t.content}</strong></p>
          <p>- ${t.author}</p>

          ${t.imageUrl ? `<img src="${t.imageUrl}" width="200" />` : ''}

          ${
            t.videoUrl
              ? `
            <iframe
              width="200"
              height="150"
              src="https://www.youtube.com/embed/${getId(t.videoUrl)}"
            ></iframe>
          `
              : ''
          }
        </div>
      `,
        )
        .join('');
    });

  function getId(url) {
    const match = url.match(/(?:v=|youtu\.be\/)([^&]+)/);
    return match ? match[1] : '';
  }
})();
