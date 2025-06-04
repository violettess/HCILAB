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
  
  const quizData = [
    {
      question: "Which dinosaur had a club-like tail and strong armor on its back?",
      options: [
        {
          image: "asset/stegosaurus.png",
          label: "Stegosaurus"
        },
        {
          image: "asset/t-rex.png",
          label: "T-rex"  
        },
        {
          image: "asset/ankylosaurus.png",
          label: "Ankylosaurus"
        }
      ],
      correctIndex: 2, // Ankylosaurus
      funFact: "The Ankylosaurus's club tail could generate enough force to break the bones of even the mighty T-Rex! Its armor plates were made of bone covered in keratin, the same material as human fingernails."
    },
    {
      question: "What did the Spinosaurus mainly eat?",
      options: [
        {
          image: "asset/fish.png",
          label: "Fish"
        },
        {
          image: "asset/plants.png",
          label: "Plants"  
        },
        {
          image: "asset/dino.png",
          label: "Small dinosaurus"
        }
      ],
      correctIndex: 2, // Fish
      funFact: "Spinosaurus lived near rivers and lakes, making it perfectly suited to hunt fish. Its long jaws and conical teeth helped it catch slippery prey!"
    },
    {
      question: "Where did the Triceratops usually live?",
      options: [
        {
          image: "asset/jungle.png",
          label: "Swampy jungles"
        },
        {
          image: "asset/plains.png",
          label: "Wetlands and plains"  
        },
        {
          image: "asset/coast.png",
          label: "Ocean coasts"
        }
      ],
      correctIndex: 1, // Dry plains and forests
      funFact: "Triceratops fossils are often found in what used to be open plains and woodland, ideal for grazing on low-lying plants."
    }
  ];
  
  let currentQuestion = 0;
  let selectedOption = null;
  
  tabPull.addEventListener('click', function() {
    quizPage.style.right = '0';
    tabPull.style.display = 'none';
    if (currentQuestion !== 0) {
      currentQuestion = 0;
      loadQuestion();
    }
  });
  
  backBtn.addEventListener('click', function() {
    quizPage.style.right = '-100%';
    setTimeout(function() {
      tabPull.style.display = 'flex';
    }, 600);
  });
  
  function loadQuestion() {
    progressEl.textContent = `Question ${currentQuestion + 1}/${quizData.length}`;
    

    const questionData = quizData[currentQuestion];
    

    questionEl.textContent = questionData.question;
    
    optionsEl.innerHTML = '';
    
    questionData.options.forEach(function(option, index) {
      const imageOption = document.createElement('div');
      imageOption.className = 'image-option';
      imageOption.setAttribute('data-index', index);
      
      const img = document.createElement('img');
      img.src = option.image;
      img.alt = option.label;
      imageOption.appendChild(img);
      
      const label = document.createElement('div');
      label.className = 'label';
      label.textContent = option.label;
      imageOption.appendChild(label);
      
      imageOption.addEventListener('click', function() {
        const allOptions = optionsEl.querySelectorAll('.image-option');
        allOptions.forEach(function(opt) {
          opt.classList.remove('selected', 'correct', 'incorrect');
        });
        
        imageOption.classList.add('selected');
        selectedOption = index;
        
        checkAnswer();
      });
      
      optionsEl.appendChild(imageOption);
    });
    
    selectedOption = null;

    funFactEl.style.display = 'none';
    
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.disabled = currentQuestion === 2;

  }
  
  function checkAnswer() {
    if (selectedOption === null) return;
    
    const options = optionsEl.querySelectorAll('.image-option');
    
    clearResultIndicators();
    
    options[quizData[currentQuestion].correctIndex].classList.add('correct');
    
    if (selectedOption !== quizData[currentQuestion].correctIndex) {
      options[selectedOption].classList.add('incorrect');
    }
    
    funFactTextEl.textContent = quizData[currentQuestion].funFact;
    funFactEl.style.display = 'block';
  }
  
  prevBtn.addEventListener('click', function() {
    if (currentQuestion > 0) {
      currentQuestion--;
      loadQuestion();
      clearResultIndicators();
    }
  });
  
  nextBtn.addEventListener('click', function() {
    if (currentQuestion < quizData.length - 1) {
      currentQuestion++;
      loadQuestion();
      clearResultIndicators();
    }
  });
  
  function clearResultIndicators() {
    const options = optionsEl.querySelectorAll('.image-option');
    options.forEach(function(opt) {
      opt.classList.remove('correct', 'incorrect');
    });
  }
  
  loadQuestion();
  
  document.addEventListener('error', function(e) {
    if (e.target.tagName.toLowerCase() === 'img') {
      e.target.src = 'asset/placeholder-dino.svg';
      console.log('Image not found, replaced with placeholder');
    }
  }, true);
});