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
    question: "Dinosaurus mana yang memiliki ekor seperti gada dan pelindung kuat di punggungnya?",
    questionImage: null,
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
    correctIndex: 2,
    funFact: "Ekor Ankylosaurus bisa menghasilkan pukulan sekuat itu hingga mampu mematahkan tulang T-Rex! Pelindung tubuhnya terbuat dari tulang yang dilapisi keratin, sama seperti kuku manusia."
  },
  {
    question: "Apa makanan utama Spinosaurus?",
    questionImage: "asset/spinosaurus.png",
    options: [
      {
        image: "asset/fish.png",
        label: "Ikan"
      },
      {
        image: "asset/plants.png",
        label: "Tumbuhan"  
      },
      {
        image: "asset/dino.png",
        label: "Dinosaurus kecil"
      }
    ],
    correctIndex: 0,
    funFact: "Spinosaurus hidup di dekat sungai dan danau, sangat cocok untuk berburu ikan. Rahangnya yang panjang dan gigi runcingnya membantunya menangkap mangsa licin!"
  },
  {
    question: "Di mana Triceratops biasanya hidup?",
    questionImage: "asset/triceratops.png",
    options: [
      {
        image: "asset/jungle.png",
        label: "Hutan rawa"
      },
      {
        image: "asset/plains.png",
        label: "Padang rumput dan lahan basah"  
      },
      {
        image: "asset/coast.png",
        label: "Pesisir laut"
      }
    ],
    correctIndex: 1,
    funFact: "Fosil Triceratops sering ditemukan di bekas padang rumput dan hutan terbuka, tempat ideal untuk memakan tanaman rendah."
  }
];
  
  let currentQuestion = 0;
  let selectedOption = null;
  let questionAnswered = false;
  
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
    
    questionEl.innerHTML = '';
    
    const questionContainer = document.createElement('div');
    questionContainer.style.display = 'flex';
    questionContainer.style.alignItems = 'center';
    questionContainer.style.justifyContent = 'center';
    questionContainer.style.gap = '20px';
    questionContainer.style.flexWrap = 'wrap';
    
    const questionText = document.createElement('span');
    questionText.textContent = questionData.question;
    questionText.style.flex = '1';
    questionText.style.minWidth = '300px';
    questionContainer.appendChild(questionText);
    
    if (questionData.questionImage) {
      const questionImg = document.createElement('img');
      questionImg.src = questionData.questionImage;
      questionImg.alt = 'Dinosaur';
      questionImg.style.width = '120px';
      questionImg.style.height = '120px';
      questionImg.style.objectFit = 'contain';
      questionImg.style.borderRadius = '10px';
      questionImg.style.backgroundColor = 'white';
      questionImg.style.padding = '10px';
      questionImg.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
      
      questionImg.onerror = function() {
        this.style.display = 'none';
      };
      
      questionContainer.appendChild(questionImg);
    }
    
    questionEl.appendChild(questionContainer);
    
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
        
        if (questionAnswered) {
          return;
        }
        
        const allOptions = optionsEl.querySelectorAll('.image-option');
        allOptions.forEach(function(opt) {
          opt.classList.remove('selected', 'correct', 'incorrect');
        
          const existingCross = opt.querySelector('.cross-icon');
          if (existingCross) {
            existingCross.remove();
          }
      
          const existingCheck = opt.querySelector('.check-icon');
          if (existingCheck) {
            existingCheck.remove();
          }
        });
        
        imageOption.classList.add('selected');
        selectedOption = index;
        
        checkAnswer();
      });
      
      optionsEl.appendChild(imageOption);
    });
    
    selectedOption = null;
    questionAnswered = false;

    funFactEl.style.display = 'none';
    
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.disabled = currentQuestion === quizData.length - 1;
  }
  
  function checkAnswer() {
    if (selectedOption === null) return;
    
    const options = optionsEl.querySelectorAll('.image-option');
    const correctIndex = quizData[currentQuestion].correctIndex;
    
    clearResultIndicators();
    
    options[correctIndex].classList.add('correct');
    addCheckToOption(options[correctIndex]);
    
    if (selectedOption !== correctIndex) {
      options[selectedOption].classList.add('incorrect');
      addCrossToOption(options[selectedOption]);
    }
    
    questionAnswered = true;
    
    funFactTextEl.textContent = quizData[currentQuestion].funFact;
    funFactEl.style.display = 'block';
  }
  
  function addCrossToOption(optionElement) {
    const crossIcon = document.createElement('div');
    crossIcon.className = 'cross-icon';
    crossIcon.innerHTML = '✕';
    
    optionElement.appendChild(crossIcon);
  }
  
  function addCheckToOption(optionElement) {
    const checkIcon = document.createElement('div');
    checkIcon.className = 'check-icon';
    checkIcon.innerHTML = '✓';
    
    optionElement.appendChild(checkIcon);
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
      const crossIcon = opt.querySelector('.cross-icon');
      if (crossIcon) {
        crossIcon.remove();
      }
      const checkIcon = opt.querySelector('.check-icon');
      if (checkIcon) {
        checkIcon.remove();
      }
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