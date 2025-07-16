// This function runs when the button is clicked
/*      function greetUser() {
        let name = prompt("What's your name? \n ཁྱེད་རང་གི་མིང་ལ་ག་རེ་རེད།");
        if (name) {
          alert("Tashi Delek བཀྲ་ཤིས་བདེ་ལེགས།, " + name + "! 👋");
        } else {
          alert("You didn't enter a name.");
        }
      }
      */
// Initialize the map centered near village
  // Initialize the map centered between lhasa and MIT
  const map = L.map('map').setView([30.5, 85], 5);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const village = [29.1035, 92.5066];
  const lhasa = [29.6578, 91.1175];
  const MIT = [42.3601, -71.0942]; 


  const storyPanel = document.getElementById('story-panel');

  // Marker for village
  L.marker(village).addTo(map)
    .bindPopup("Methok's village")
    .on('click', () => {
      storyPanel.innerHTML = `
        <h2>Methok's village</h2>
        <p><strong>Methok's village</strong> where she was born and raised.
      `;
    });

  // Marker for Lhasa
  L.marker(lhasa).addTo(map)
    .bindPopup("Lhasa")
    .on('click', () => {
      storyPanel.innerHTML = `
        <h2>Lhasa</h2>
        <p><strong>Lhasa</strong> is the capital of tibet.
      `;
    });
    // Marker for MIT
      L.marker(MIT).addTo(map)
        .bindPopup("MIT")
        .on('click', () => {
          storyPanel.innerHTML = `
            <h2>Massachusetts Institute of Technology</h2>
            <p>MIT is a world leading private university in Cambridge, Massachusetts, best known for excellence in STEM fields, including computer science.
          `;
        });
  const path = L.polyline([village, lhasa, MIT], {
    color: 'red',
    weight: 4
  }).addTo(map);

  map.fitBounds(path.getBounds(), {
    paddingTopLeft: [50, 50],
    paddingBottomRight: [50, 50],
    maxZoom: 7
  });


// My image slide with captions
      const slides = document.querySelectorAll('.carousel-slide');
      let current = 0;

      document.querySelector('.next-btn').addEventListener('click', () => {
        slides[current].classList.add('hidden');
        current = (current + 1) % slides.length;
        slides[current].classList.remove('hidden');
      });

      document.querySelector('.prev-btn').addEventListener('click', () => {
        slides[current].classList.add('hidden');
        current = (current - 1 + slides.length) % slides.length;
        slides[current].classList.remove('hidden');
      });

// Three capitals story block
     const storyBlocks = document.querySelectorAll('.story-block');

    const revealOnScroll = () => {
      storyBlocks.forEach(block => {
        const top = block.getBoundingClientRect().top;
        const bottom = block.getBoundingClientRect().bottom;

        if (top < window.innerHeight * 0.85 && bottom > 0) {
          block.classList.add('revealed');
        } else {
          block.classList.remove('revealed'); // Remove on scroll out
        }
      });
    };

    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);
