document.addEventListener('DOMContentLoaded', function() {
  const tabPull = document.getElementById('tabPull');
  const quizPage = document.getElementById('quizPage');
  const backBtn = document.getElementById('backBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const questionEl = document.getElementById('question');
  const optionsEl = document.getElementById('options');
  const progressEl = document.getElementById('progress');
  const funFactEl = document.getElementById('funFact');
  const funFactTextEl = document.getElementById('funFactText');
  
  // Quiz data with images
  const quizData = [
    {
      question: "Which dinosaur had a club-like tail and strong armor on its back?",
      options: [
        {
          image: "dino/stegosaurus.png",
          label: "Stegosaurus"
        },
        {
          image: "dino/t-rex.png",
          label: "T-rex"  
        },
        {
          image: "dino/ankylosaurus.png",
          label: "Ankylosaurus"
        }
      ],
      correctIndex: 2, // Ankylosaurus
      funFact: "The Ankylosaurus's club tail could generate enough force to break the bones of even the mighty T-Rex! Its armor plates were made of bone covered in keratin, the same material as human fingernails."
    },
    {
      question: "Which dinosaur had a sail-like shape on its back and liked to swim?",
      options: [
        {
          image: "dino/parasaurolophus.png",
          label: "Parasaurolophus"
        },
        {
          image: "dino/velociraptor.png",
          label: "Velociraptor"  
        },
        {
          image: "dino/spinosaurus.png",
          label: "Spinosaurus"
        }
      ],
      correctIndex: 2, // Spinosaurus
      funFact: "Spinosaurus was the largest carnivorous dinosaur ever discovered, even bigger than T-Rex! Its sail may have stored fat for long swimming expeditions or could have changed color for impressive mating displays."
    },
    {
      question: "Which dinosaur had big plates on its back and a spiky tail?",
      options: [
        {
          image: "dino/triceratops.png",
          label: "Triceratops"
        },
        {
          image: "dino/stegosaurus.png",
          label: "Stegosaurus"  
        },
        {
          image: "dino/pteranodon.png",
          label: "Pteranodon"
        }
      ],
      correctIndex: 1, // Stegosaurus
      funFact: "Stegosaurus had a brain the size of a walnut, one of the smallest brain-to-body ratios of any dinosaur! It also had a second 'brain' near its hips to help control its back legs and tail."
    }
  ];
  
  // Current question index and selected option
  let currentQuestion = 0;
  let selectedOption = null;
  
  // When the tab is clicked, show the quiz page
  tabPull.addEventListener('click', function() {
    // Move the quiz page in from the right
    quizPage.style.right = '0';
    // Hide the tab pull
    tabPull.style.display = 'none';
    // Reset to first question when opening quiz
    if (currentQuestion !== 0) {
      currentQuestion = 0;
      loadQuestion();
    }
  });
  
  // Go back to the main page
  backBtn.addEventListener('click', function() {
    quizPage.style.right = '-100%';
    setTimeout(function() {
      tabPull.style.display = 'flex';
    }, 600);
  });
  
  // Load a question from the quiz data
  function loadQuestion() {
    // Update progress indicator
    progressEl.textContent = `Question ${currentQuestion + 1}/${quizData.length}`;
    
    // Get current question data
    const questionData = quizData[currentQuestion];
    
    // Set question text
    questionEl.textContent = questionData.question;
    
    // Clear existing options
    optionsEl.innerHTML = '';
    
    // Add new image options
    questionData.options.forEach(function(option, index) {
      const imageOption = document.createElement('div');
      imageOption.className = 'image-option';
      imageOption.setAttribute('data-index', index);
      
      // Create image element
      const img = document.createElement('img');
      img.src = option.image;
      img.alt = option.label;
      imageOption.appendChild(img);
      
      // Create label
      const label = document.createElement('div');
      label.className = 'label';
      label.textContent = option.label;
      imageOption.appendChild(label);
      
      // Add click event listener
      imageOption.addEventListener('click', function() {
        // Remove selection from all options
        const allOptions = optionsEl.querySelectorAll('.image-option');
        allOptions.forEach(function(opt) {
          opt.classList.remove('selected', 'correct', 'incorrect');
        });
        
        // Select this option
        imageOption.classList.add('selected');
        selectedOption = index;
        
        // Automatically check answer after selection
        checkAnswer();
      });
      
      optionsEl.appendChild(imageOption);
    });
    
    // Reset selected option
    selectedOption = null;
    
    // Hide fun fact when loading a new question
    funFactEl.style.display = 'none';
    
    // Update navigation buttons
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.disabled = currentQuestion === 2;

  }
  
  // Check the answer
  function checkAnswer() {
    if (selectedOption === null) return;
    
    // Get all options
    const options = optionsEl.querySelectorAll('.image-option');
    
    clearResultIndicators();
    
    // Mark correct answer
    options[quizData[currentQuestion].correctIndex].classList.add('correct');
    
    // Mark incorrect answer
    if (selectedOption !== quizData[currentQuestion].correctIndex) {
      options[selectedOption].classList.add('incorrect');
    }
    
    // Show fun fact with animation
    funFactTextEl.textContent = quizData[currentQuestion].funFact;
    funFactEl.style.display = 'block';
  }
  
  // Move to previous question
  prevBtn.addEventListener('click', function() {
    if (currentQuestion > 0) {
      currentQuestion--;
      loadQuestion();
      clearResultIndicators();
    }
  });
  
  // Move to next question
  nextBtn.addEventListener('click', function() {
    if (currentQuestion < quizData.length - 1) {
      currentQuestion++;
      loadQuestion();
      clearResultIndicators();
    }
  });
  
  // Clear indicators
  function clearResultIndicators() {
    const options = optionsEl.querySelectorAll('.image-option');
    options.forEach(function(opt) {
      opt.classList.remove('correct', 'incorrect');
    });
  }
  
  // Initialize the first question
  loadQuestion();
  
  // Fallback for missing images - replace with placeholder
  document.addEventListener('error', function(e) {
    if (e.target.tagName.toLowerCase() === 'img') {
      e.target.src = 'asset/placeholder-dino.svg';
      console.log('Image not found, replaced with placeholder');
    }
  }, true);
});