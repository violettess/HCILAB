  const tabPull = document.getElementById('tabPull');
  const quizPage = document.getElementById('quizPage');
  const backBtn = document.getElementById('backBtn');
  const checkAnswerBtn = document.getElementById('checkAnswer');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const questionEl = document.getElementById('question');
  const optionsEl = document.getElementById('options');
  const progressEl = document.getElementById('progress');
  const funFactEl = document.getElementById('funFact');
  const funFactTextEl = document.getElementById('funFactText');
  
  // Quiz data
  const quizData = [
    {
      question: "Which dinosaur had a club-like tail and strong armor on its back?",
      options: ["A) Stegosaurus", "B) Velociraptor", "C) Parasaurolophus", "D) Ankylosaurus", "E) Triceratops"],
      correctIndex: 3, // D) Ankylosaurus
      funFact: "The Ankylosaurus's club tail could generate enough force to break the bones of even the mighty T-Rex! Its armor plates were made of bone covered in keratin, the same material as human fingernails."
    },
    {
      question: "What made Parasaurolophus special?",
      options: ["A) It had sharp claws", "B) It could fly", "C) It had a long crest on its head", "D) It had three horns", "E) It hunted in packs"],
      correctIndex: 2, // C) It had a long crest on its head
      funFact: "The hollow crest of Parasaurolophus could have been used like a musical instrument! Scientists believe it made deep trumpet-like sounds that could be heard for miles, helping them communicate with their herd."
    },
    {
      question: "Which animal was not a dinosaur, but could fly with big wings?",
      options: ["A) Velociraptor", "B) Pteranodon", "C) Ankylosaurus", "D) Triceratops", "E) Spinosaurus"],
      correctIndex: 1, // B) Pteranodon
      funFact: "Despite popular belief, Pteranodon wasn't a dinosaur but a flying reptile called a pterosaur! With a wingspan of up to 23 feet, it could soar high above the landscape without flapping its wings for long periods."
    },
    {
      question: "What did Spinosaurus like to eat?",
      options: ["A) Fruits", "B) Leaves", "C) Insects", "D) Fish and meat", "E) Flowers"],
      correctIndex: 3, // D) Fish and meat
      funFact: "Spinosaurus is the only known dinosaur adapted for swimming! Recent fossil discoveries show it had dense bones like a penguin and possibly webbed feet, making it a fearsome aquatic predator."
    },
    {
      question: "Which dinosaur had big plates on its back and a spiky tail?",
      options: ["A) T-Rex", "B) Velociraptor", "C) Stegosaurus", "D) Triceratops", "E) Parasaurolophus"],
      correctIndex: 2, // C) Stegosaurus
      funFact: "Stegosaurus had a brain the size of a walnut, one of the smallest brain-to-body ratios of any dinosaur! It also had a second 'brain' near its hips to help control its back legs and tail."
    },
    {
      question: "What helped Triceratops protect itself?",
      options: ["A) Big wings", "B) A long tail", "C) A loud roar", "D) Three horns and a big frill", "E) Fast running"],
      correctIndex: 3, // D) Three horns and a big frill
      funFact: "A Triceratops skull could grow up to 8 feet long — about one-third of its entire body length! Their frills weren't just for defense but also for attracting mates and regulating body temperature."
    },
    {
      question: "Who was the king of dinosaurs, with strong jaws and tiny arms?",
      options: ["A) Spinosaurus", "B) Velociraptor", "C) Stegosaurus", "D) Tyrannosaurus Rex", "E) Ankylosaurus"],
      correctIndex: 3, // D) Tyrannosaurus Rex
      funFact: "T-Rex had the strongest bite force of any land animal ever, able to crush bones with 8,000 pounds of pressure! Despite their tiny arms, they were surprisingly muscular and could likely lift about 400 pounds each."
    },
    {
      question: "What was Velociraptor good at?",
      options: ["A) Flying in the sky", "B) Digging tunnels", "C) Running fast and hunting in groups", "D) Eating plants", "E) Hiding in trees"],
      correctIndex: 2, // C) Running fast and hunting in groups
      funFact: "Real Velociraptors were only about the size of a turkey, much smaller than shown in movies! They were also covered in feathers and more closely related to modern birds than to reptiles."
    },
    {
      question: "Which dinosaur had a sail-like shape on its back and liked to swim?",
      options: ["A) Triceratops", "B) Ankylosaurus", "C) Parasaurolophus", "D) Spinosaurus", "E) Pteranodon"],
      correctIndex: 3, // D) Spinosaurus
      funFact: "Spinosaurus was the largest carnivorous dinosaur ever discovered, even bigger than T-Rex! Its sail may have stored fat for long swimming expeditions or could have changed color for impressive mating displays."
    },
    {
      question: "Where did most of the dinosaurs like Triceratops and T-Rex live?",
      options: ["A) Africa", "B) Asia", "C) Antarctica", "D) America (North America)", "E) Australia"],
      correctIndex: 3, // D) America (North America)
      funFact: "During the late Cretaceous period, North America was split by a vast inland sea! T-Rex and Triceratops lived in a lush coastal region called 'Laramidia' that would later become the western United States."
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
    
    // Add new options
    questionData.options.forEach(function(optionText, index) {
      const option = document.createElement('div');
      option.className = 'quiz-option';
      option.textContent = optionText;
      
      // Add click event listener
      option.addEventListener('click', function() {
        // Remove selection from all options
        const allOptions = optionsEl.querySelectorAll('.quiz-option');
        allOptions.forEach(function(opt) {
          opt.classList.remove('selected');
        });
        
        // Select this option
        option.classList.add('selected');
        selectedOption = index;
      });
      
      optionsEl.appendChild(option);
    });
    
    // Reset selected option
    selectedOption = null;
    
    // Hide fun fact when loading a new question
    funFactEl.style.display = 'none';
    
    // Update navigation buttons
    prevBtn.disabled = currentQuestion === 0;
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
  
  // Check the answer when the check button is clicked
  checkAnswerBtn.addEventListener('click', function() {
    if (selectedOption === null) return;
    
    // Get all options
    const options = optionsEl.querySelectorAll('.quiz-option');
    
    clearResultIndicators();
    
    // Mark correct answer
    options[quizData[currentQuestion].correctIndex].classList.add('correct');
    
    // Mark incorrect answer
    if (selectedOption !== quizData[currentQuestion].correctIndex) {
      options[selectedOption].classList.add('incorrect');
    }
    
    // Show fun fact
    funFactTextEl.textContent = quizData[currentQuestion].funFact;
    funFactEl.style.display = 'block';
  });
  
  // Clear indicators
  function clearResultIndicators() {
    const options = optionsEl.querySelectorAll('.quiz-option');
    options.forEach(function(opt) {
      opt.classList.remove('correct', 'incorrect');
    });
  }
  
  // Initialize the first question
  loadQuestion();